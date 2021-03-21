var balloon;
var balloonImg1;
var balloonImg2;
var balloonImg3;
var cityImg;
var database,position;

function preload(){
  backImg=loadImage("sprites/City.png");
  balloonImg1=loadImage("sprites/HotAirBallon-01.png");
  balloonImg2=loadImage("sprites/HotAirBallon-02.png");
  balloonImg3=loadImage("sprites/HotAirBallon-03.png");
}

function setup(){
   database=firebase.database();
   createCanvas(1200,500);
   balloon=createSprite(100,360,50,50);
   balloon.addAnimation("balloon",balloonImg1,balloonImg2,balloonImg3);
   balloon.scale=0.5;
   balloonPosition=database.ref("balloon/position");
   balloonPosition.on("value",readPosition);
   balloon.shapeColor = "red";
}

function draw(){
    background(backImg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW) && balloon.y>50){
        changePosition(0,-10);
        balloon.scale=balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW) && balloon.y<370){
        changePosition(0,+10);
        balloon.scale=balloon.scale+0.01;
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("balloon/position").set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readPosition(data){
    position=data.val();
    balloon.x=position.x;
    balloon.y=position.y;
}