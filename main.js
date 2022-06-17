status="";
input_text="";

function setup(){
    canvas=createCanvas(400,280);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,280);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
    input_text=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function draw(){
    image(video,0,0,400,280);
    if(status !=""){
        object_detector.detect(video,gotResults);
        for(i=0;i < objects.length;i++ ){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            console.log(objects.length);
            fill("#FF0000");
           percent=floor(objects[i].confidence *100);
           text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
           nofill();
           stroke("FF0000");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height) ;

           if(objects[i].label == input_text){
            video.stop();
            object_detector.detect(gotResults);
            document.getElementById("object_found").innerHTML= input_text +"Found";
            var synth=window.speechSynthesis;
            var utterThis=new SpeechSynthesisUtterance(input_text+"found");
            synth.speak(utterThis)
           }
           else{
            document.getElementById("object_found").innerHTML=input_text+"not Found";
           }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
    }
}

