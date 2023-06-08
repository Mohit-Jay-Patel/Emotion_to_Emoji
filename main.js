var Prediction_1 = "";
var Prediction_2 = "";

Webcam.set({
    width : 350,    
    height: 300,
    image_format:"png",
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");
function capture_image(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='image' src='"+data_uri+"'>";
    
    });
}
console.log("ml5.version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/39kvAWfmK/model.json",modelLoaded);
function modelLoaded(){
    console.log("model has been loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    var speak_1="The first prediction is "+Prediction_1;
    var speak_2="And the second prediction is "+Prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterthis);
}
function Snapshot(){
    var img = document.getElementById("image");
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        document.getElementById("result_1").innerHTML=results[0].label;
        document.getElementById("result_2").innerHTML=results[1].label;
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        speak();
        if(Prediction_1=="happy"){
            document.getElementById("emoji_1").innerHTML="&#128522";
        }
        if(Prediction_1=="sad"){
            document.getElementById("emoji_1").innerHTML="&#128530";
        }
        if(Prediction_1=="angry"){
            document.getElementById("emoji_1").innerHTML="&#128545";
        }
        if(Prediction_2=="happy"){
            document.getElementById("emoji_2").innerHTML="&#128522";
        }
        if(Prediction_2=="sad"){
            document.getElementById("emoji_2").innerHTML="&#128530";
        }
        if(Prediction_2=="angry"){
            document.getElementById("emoji_2").innerHTML="&#128545";
        }
    }
}
