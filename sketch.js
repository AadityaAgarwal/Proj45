var runner,runnerImg,runnerUpImg;
var ground;
var bgImg,bg;

var PLAY=1;
var END=0;
var gameState=PLAY;

var powerGroup,powerImg,powerUpImg,powerUp;

var gameOverImg,gameOver;

var edges;

var jumpSound;

var score;

var restart,restartImg;

function preload(){
bgImg=loadImage("bg1.jpg");
runnerImg=loadAnimation("-1.png","-2.png","-3.png","-4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png");
runnerUpImg=loadAnimation("upRunner.png");

powerImg=loadImage("power.png");

powerUpImg=loadAnimation("powerUp.png");

gameOverImg=loadImage("gameOver.png");

jumpSound=loadSound("jump.mp3");

restartImg=loadImage("restart.png");
}

function setup(){
 createCanvas(1200,400);
 
 bg=createSprite(100,190,1200,400);
 bg.addImage(bgImg);
 bg.scale=1.3;
 bg.x = bg.width /2;

 runner=createSprite(50,360,20,50);
 runner.addAnimation("running",runnerImg);
 runner.addAnimation("up",runnerUpImg);
 runner.scale=0.7;
 
 ground=createSprite(200,390,400,10);
 ground.visible=false; 

 powerGroup=createGroup();

 gameOver=createSprite(600,200);
 gameOver.addImage(gameOverImg);

 powerUp=createSprite(0,0,10,10);
 powerUp.addAnimation("powerUp",powerUpImg);
powerUp.visible=false;

 gameOver.scale=0.5;

 gameOver.visible=false;

 restart=createSprite(600,200);
 restart.addImage(restartImg);
 restart.scale=0.5;
 restart.visible=false;

 runner.setCollider("circle",0,0,80);
 //runner.debug = true;

 score=0;
}

function draw(){
background(180);

console.log(runner.y);

edges=createEdgeSprites();

if(gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")){
        runner.velocityY=-12;
        runner.changeAnimation("up",runnerUpImg);
    }
    runner.changeAnimation("running",runnerImg);
runner.velocityY=runner.velocityY+0.8;

if (bg.x < 0){
    bg.x = bg.width /2;
  }
  bg.velocityX=-5;

  group();

  if(powerGroup.isTouching(runner)){
      runner.visible=false;
      powerGroup.destroyEach();
      //runner.changeImage("p1",powerUpImg);

      //powerUp.visible=true;

      //powerUp.x=runner.x;
      //powerUp.y=runner.y;

      //powerUp.lifetime=200;
      //if(){
        //  powerUp.destroy();
      //}
  }
}

if(gameState===END){
gameOver.visible=true;
restart.visible=true;

bg.velocityX=0;
runner.velocityY=0;
}
runner.collide(ground);

runner.collide(edges[2]);

    drawSprites();
}

function group(){

    if(frameCount%500===0){
    var p=createSprite(600,random(0,390),10,40);
    p.velocityX=-6;

    p.setCollider("circle",0,0,40);
    //p.debug=true;

    p.addImage(powerImg);

    p.scale = 0.4;
    p.lifetime = 300;

    powerGroup.add(p);
 }
  }

