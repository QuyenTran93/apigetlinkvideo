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
    var rRequest = await ctrlGeneral.requestPromise({
      'uri': uri,
      'headers': {
        'user-agent': 'ozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36'
      }
    });
    var documentRequest = rRequest.body ? rRequest.body.toString('utf-8') : rRequest.body;
    var mHD = documentRequest.match(/hd_src:"(.+?)"/);
    var mSD = documentRequest.match(/sd_src:"(.+?)"/);

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
        result.urls.sd_src = mSD[1];
      if (mHD)
        result.urls.hd_src = mHD[1];
    }
    return res.json(result);
  } catch (error) {
    console.trace(error);
    return res.json({ 'success': false, 'msg': 'This video is unavailable.' });
  }
}