'use strict';

var youtubeHelper = require('./youtube.helper');

exports.getUrl = async (req, res) => {
  try {
    var uri = req.query.url;
    if (!!!uri)
      return res.json({ 'success': false, 'msg': 'Invalid Request!' });
    var info = await youtubeHelper.getInfoAsync(uri);
    if (!!!info.url)
      return res.json({ 'success': false, 'msg': `Can't get link video!` });
    console.log(info);
    return res.json({ 'success': true, 'msg': 'Get url of video success!', 'url': info.url });
  } catch (error) {
    console.trace(error);
    return res.json({ 'success': false, 'msg': 'System error. Please try again!' });
  }
}