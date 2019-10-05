const ocrSpaceApi = require('ocr-space-api');
 
var options =  { 
    apikey: '8d56bdab8188957',
    language: 'eng', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
  };

  


// Get the 'speak' button


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
  
  // Set the text.
	msg.text = text;
  
  // Set the attributes.1
	msg.volume =1;
	msg.rate = 1;
	msg.pitch =1;
  
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
  
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}



 
// Image file to upload
const imageFilePath = "1.jpeg";
 
// Run and wait the result
ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
  .then(function (parsedResult) {
    console.log('parsedText: \n', parsedResult.parsedText);
    speak(parsedResult.parsedText);

   // console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
  }).catch(function (err) {
    console.log('ERROR:', err);
  });