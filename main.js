img = "";
modelstatus = "";
objects = [];
detector="";

function preload() {
    alarm=loadSound("alarm.wav");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    detector.detect(video, gotResults);
    if (modelstatus != "") {
        console.log(objects.length);
        r=random(255);
        g=random(255);
        b=random(255);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("no_objects").innerHTML = "No. of objects detected : "+objects.length;

            console.log(i);

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                alarm.stop();
                console.log("person found");
            }else{
                alarm.play();
                console.log("person not found");
            }
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    modelstatus = true;
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        objects = result;
    }
}