const FaceApi = require('node-mscs-face');

 
// Pass in your Face API subscription key and your Face API's region to get started
var faceApi = new FaceApi('c6c7ca3d98b741c1a1c46c3d380ddaeb', 'WCUS');
var fs = require("fs");
var data1='https://image.shutterstock.com/z/stock-photo-portrait-of-a-sad-man-126009806.jpg'


  // Encode to base64
  
  faceApi.detect(data1)
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
