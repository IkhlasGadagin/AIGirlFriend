const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
console.log(SpeechRecognition)
if(!SpeechRecognition){
  console.log("error in the Speech the browser will not support");
}
else{
const r = new SpeechRecognition()
r.continuous = false
r.interimResults = false
r.maxAlternatives = 1

r.onstart = function () {
    console.log("Speech Recognition Started");
    scrib.show("recording is started")
};
  
r.onresult = async function(event){
  console.log(event);
  const transcript = event.results[0][0].transcript;
  console.log("Transcript", transcript);
  scrib.show(`you Said :-${transcript}`)
  const replay = callGemini(transcript)
  scrib.show(`THE REPLAY fron the Girl${replay}`)
}

r.start();
 console.log("STarted")
}

async function callGemini(text){
const body =  {
   contents: [{ "parts":[{"text": text}]}]
}
const Api_key = 'AIzaSyAqu4Zk9cLqLr_AWMQU8_i43BiQNGp4gD8'
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${Api_key}`
	  ,{
       method: 'POST',
       headers: {'Content-Type' :'application/json'},
       body : JSON.stringify(body)
       })
  const result = await response.json()
  return result
}