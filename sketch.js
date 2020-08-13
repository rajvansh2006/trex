var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclegroup,cloudgroup;
var cloudimage,ob1,ob2,ob3,ob4,ob5,ob6; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,gameOverimg,restartimg;

//score
var count = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstaclegroup=new Group();
  cloudgroup=new Group();
  
   gameOver = createSprite(250,100);
 restart = createSprite(250,140);
gameOver.addImage("gameOver",gameOverimg);
gameOver.scale = 0.5;
restart.addImage("restart",restartimg);
restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(255);
  text("score :"+count,450,50);
  if(gameState===PLAY){
    
  if(keyDown("space")&&trex.y>=159) {
    trex.velocityY = -10;
  }
  count =count+ Math.round(World.frameRate/60);
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
    if(obstaclegroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation("trex_collided",trex_collided);
    trex.changeAnimation("trex_collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
 
 gameOver.visible = true;
 restart.visible = true;
 
if ( mousePressedOver(restart)) {
 reset(); 
   
  }
   
    
    
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =Math.round( random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
  switch(rand){
    case 1:obstacle.addImage(ob1);
    break;
    case 2:obstacle.addImage(ob2);
    break;
    case 3:obstacle.addImage(ob3);
    break;
    case 4:obstacle.addImage(ob4);
    break;
    case 5:obstacle.addImage(ob5);
    break;
    case 6:obstacle.addImage(ob6);
    break;
    default:break;
  }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
   trex.addAnimation("trex",trex_running);
  trex.changeAnimation("trex",trex_running);
  
  count = 0;
  
}
