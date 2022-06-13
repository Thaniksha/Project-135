status="";

function setup(){
    canvas=createCanvas(400,280);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,280);
    video.hide();
}

function draw(){
    image(video,0,0,400,280);
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    video.loop();
}