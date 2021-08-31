Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
    });
    
    camera = document.getElementById("camera");
    
    Webcam.attach(camera);
    
    
    
    function take_snapshot()
    {
        Webcam.snap(function(data_uri) {
            document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
        })
    }
    
    console.log('ml5 veraion:', ml5.version);
    
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vcXRnIrjW/model.json', modelLoaded);
    
    function modelLoaded() {
        console.log('Model Loaded!');
    }
    
    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "The first prediction is " + prediction_1;
        speak_data_2 = "And the second prediction is " + prediction_2;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        synth.speak(utterThis);
    
    }

    function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
     else {
    console.log(result);

        document.getElementById("emotion").innerHTML=result[0].label;
    document.getElementById("emotion2").innerHTML=result[1].label;
    prediction_1=result[0].label;
    prediction_2=result[1].label;
    speak();

    if(prediction_1== "Amazing"){
    document.getElementById("emoji").innerHTML="&#128076;";

        
    }
    if(prediction_1== "Victory"){
        document.getElementById("emoji").innerHTML="&#x270C;";
    }

    if(prediction_1== "Good Luck"){
        document.getElementById("emoji").innerHTML="&#128077;;";
    }

    if(prediction_2== "Amazing"){
        document.getElementById("emoji2").innerHTML="&#128076;";
    
            
        }
        if(prediction_2== "Victory"){
            document.getElementById("emoji2").innerHTML="&#x270C;";
        }
    
        if(prediction_2== "Good Luck"){
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
    }
}