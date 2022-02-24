'use strict';

// var youtubeHelper = require('./youtube.helper');
var ctrlGeneral = require('../controller.general');

// (?:https?:\/)?(?:www.|web.|m.)?facebook.com\/(?:video.php\?v=\d+|watch\/\?v=\d+|photo.php\?v=\d+|\?v=\d+)|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?
// /(https?:\/\/)?(www.)?(facebook\.com)\/(\S*\/)*(videos?\/(embed\?video_id=|vb.\d+\/)?)(\d+)/

// https://www.facebook.com/video/embed?video_id=368508506585276,
// https://www.facebook.com/watch/?v=615775111903484
// https://www.facebook.com/1399785403664362/videos/1428693740773528,
// https://www.facebook.com/annacay22/videos/1169018463231376,
// https://www.facebook.com/snackk100/videos/754790044667598/?permPage=1,
// https://www.facebook.com/insight.co.kr/videos/vb.374726359324617/907652546031993/?type=2&theater,
// https://www.facebook.com/Jrockradio/videos/vb.102198813200663/880536688700201/?type=2&theater,
// https://www.facebook.com/ICMSChairman/videos/vb.595785693780145/1089273701098006/?type=2&theater,
// https://www.facebook.com/huffpostkorea/videos/615775111903484/?permPage=1,
// https://www.facebook.com/snackk100/videos/vb.713427005470569/765726663573936/?type=2&theater,

exports.getUrl = async (req, res) => {
  try {
    var uri = req.query.url;
    if (!!!uri)
      return res.json({ 'success': false, 'msg': 'Invalid Request!' });
    uri = uri.replace(/mbasic/, 'www');
    var regexUrl = /(?:https?:\/)?(?:www.|web.|m.)?facebook.com\/(?:video.php\?v=\d+|watch\/\?v=\d+|photo.php\?v=\d+|\?v=\d+|videos?\/(embed\?video_id=|vb.\d+\/?)(\d+))|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/;

    var regexEmbedUrl = /(https?:\/\/)?(www.)?(facebook\.com)\/(\S*\/)*(video\/(embed\?video_id=)?)(\d+)/;
    if (regexEmbedUrl.test(uri)) {
      var video_id = uri.match(/embed\?video_id=(\d+)/);
      if (video_id)
        uri = 'https://www.facebook.com/watch/?v='+video_id[1];
    }
    if (!regexUrl.test(uri))
      return res.json({ 'success': false, 'msg': 'Can\'t Not Accepted Url!'});
    // console.log(uri);
    var rRequest = await ctrlGeneral.requestPromise({
      'uri': uri,
      'headers': {
      	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
        'cookie': 'sb=gah7YXn7APtmSN8jbj07_TeF; datr=gah7YSb5ExBAFeA2xSQQduQf; c_user=100008061092898; xs=35%3AXBxk7aOHBT8IkA%3A2%3A1639980513%3A-1%3A7478%3A%3AAcV4Xy3DtwRgXFt-w94kZ0DPj1lUwrBI1eVsDekRBmts; fr=0MozN18PSU0UXSWLE.AWWaX2L7Di5OdTraVzgEzeB51A4.BiF4hz.CZ.AAA.0.0.BiF4hz.AWWLNIrvhZA; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1645709583938%2C%22v%22%3A1%7D',
      }
    });
    var documentRequest = rRequest.body ? rRequest.body.toString('utf-8') : rRequest.body;
    // console.log(documentRequest);
    var mHD = documentRequest.match(/hd_src:"(.+?)"/) || documentRequest.match(/"playable_url_quality_hd":"(.+?)"/);
    var mSD = documentRequest.match(/sd_src:"(.+?)"/) || documentRequest.match(/"playable_url":"(.+?)"/);
    // console.log(mHD, mSD);
    var result = {
      'success': false,
      'msg' : ''
    };
    if (!mSD && !mHD)
      result.msg = 'Not found url of video...';
    else {
      result.msg = true;
      result.msg = 'Get url of video success!';
      result.urls = {};
      if (mSD)
        result.urls.sd_src = mSD[1].replace(/\\\//g, '/');
      if (mHD)
        result.urls.hd_src = mHD[1].replace(/\\\//g, '/');
    }
    return res.json(result);
  } catch (error) {
    console.trace(error);
    return res.json({ 'success': false, 'msg': 'This video is unavailable.' });
  }
}
