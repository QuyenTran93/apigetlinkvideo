var youtubedl = require('youtube-dl');
var url = 'https://www.youtube.com/watch?v=M8U7PR6fQNA';
// Optional arguments passed to youtube-dl.
var options = ['--username=user', '--password=hunter2'];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;
  console.log('url:', info.url);
});

// var pattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
// router.post('/video', function(req, res, next) {
//   request.get(url, function (err, resp, body) {
//    // check if it is valid url
//    if(pattern.test(resp.request.uri.href)) {
//      // .... above code as usual
//    }

//    else {
//      res.render('listvideo', {error: 'The link you provided either not a valid url or it is not acceptable'});
//    }

//   })
// });