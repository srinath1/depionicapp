var http = require('http');

var bodyParser=require("body-parser")
var vision = require('@google-cloud/vision');
 
// Authorizing on a per-API-basis. You don't need to do this if you auth on a 
// global basis (see Authorization section above). 
 

var express = require('express');
var router = express();

var visionClient = vision({
  projectId: 'ionic-face-api',
  keyFilename: './ionic.json'
});
 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

});
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = http.createServer(router);

router.get('/myinfo',function(req,res){
           var gcsImageUri = req.body;
var source = {
    gcsImageUri : gcsImageUri
};
var image = {
    source : source
};
var type = vision.v1.types.Feature.Type.FACE_DETECTION;
var featuresElement = {
    type : type
};
var features = [featuresElement];
var requestsElement = {
    image : image,
    features : features
};
var requests = [requestsElement];
visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
    var response = responses[0];
    var newresp=response.responses[0].faceAnnotations[0].detectionConfidence;
     var newresp1=response.responses[0].faceAnnotations[0].joyLikelihood;
    
    res.send((JSON.stringify(response, null, 2))) 
    
      console.log(newresp1);
    // doThingsWith(response)
})
.catch(function(err) {
    console.error(err);
});

           
           
           
})
router.get('/data', function (req, res) {
  res.send('POST request to the homepage')
});
router.post('/info',function(req,res){
  var text=req.body.text;
  console.log(text)
  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
 
var tone_analyzer = new ToneAnalyzerV3({
    username: 'ea5a0727-769c-4c8c-aa8b-5521c378aa73',
  password: '7PA6sYyClY5J',
  version_date: '2016-05-19'
});

 
tone_analyzer.tone({ text:text },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      res.send((JSON.stringify(tone, null, 2)));
})
  
  
});



router.post('/tone',function(req,res){
   var text=req.body.text;
  console.log(text)
 var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
 
var personality_insights = new PersonalityInsightsV3({
   username: '484081f2-af74-4396-a31c-fdc76baa96bb',
  password: 'avjuIcRFH4z4',
  version_date: '2016-05-19'
});
 
personality_insights.profile({
  text: text,
  consumption_preferences: true
  },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
     res.send((JSON.stringify(response, null, 2))) 
})
  
  
})



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
 
