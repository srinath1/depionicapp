const FaceApi = require('node-mscs-face');
var base64Img = require('base64-img');
 
// Pass in your Face API subscription key and your Face API's region to get started
var faceApi = new FaceApi('1566359984ae4006b2a2c6ffa2248022', 'WCUS');
var url='https://thumb1.shutterstock.com/display_pic_with_logo/277009/293777093/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg'

base64Img.requestBase64(url, function(err, res, body) {
  faceApi.detect(res)
    .then((faceInfo) => {
        // Resolves faceInfo, an array
        faceInfo.forEach((detectedFace) => {
            // A single instance in faceInfo contains a faceId and faceRectangle
            console.log(faceInfo.faceId);
            console.log(faceInfo.faceRectangle);
        }, this);
    })
    .catch((err) => {
        // If no faces are detected, an error will be returned
        // An error can occur too if an incorrect/invalid Face API subscription key or any other incorrect parameters is provided. 
        // For more information on the kind of errors that Microsoft's Face API returns, please refer to https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236
        console.log(err);
    })
  
})
