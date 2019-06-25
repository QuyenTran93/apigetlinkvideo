'use strict';

exports.regexUrl = /(?:https?:\/)?(?:www.|web.|m.)?facebook.com\/(?:video.php\?v=\d+|watch\/\?v=\d+|photo.php\?v=\d+|\?v=\d+|videos?\/(embed\?video_id=|vb.\d+\/?)(\d+))|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/;