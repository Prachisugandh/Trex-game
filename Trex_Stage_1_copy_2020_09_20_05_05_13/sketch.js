var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup, obstacleGroup, cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart, gameOverImage, restartImage;
var gameState="play", count;
var PLAY=1
var END=0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png"); 
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1= loadImage("obstacle1.png")
  obstacle2= loadImage("obstacle2.png")
  obstacle3= loadImage("obstacle3.png")
  obstacle4= loadImage("obstacle4.png")
  obstacle5= loadImage("obstacle5.png")
  obstacle6= loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage= loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.x=50;
  trex.scale = 0.5;
// trex.setCollider("rectangle",0,0,120,80);
// trex.debug= true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround =  createSprite(200,190,400,10); 
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,50,10,10)
  gameOver.addImage("over",gameOverImage);
  gameOver.scale=0.7;
  gameOver.visible=false;
  
  restart = createSprite(300,100,10,10)
  restart.addImage("reset",restartImage);
  // restart.scale=1;
  restart.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();

  count=0;

}

function draw() {
  background("white");
  
  textSize(20);
  textFont("Georgia");
  textStyle(BOLD);
  text("Score: "+ count, 300, 40);
  
  if (gameState === "play"){
      ground.velocityX = -(4 +(2*count/100));
      if (ground.x < 0){
    ground.x = ground.width/2;
  }
   
   count = count + Math.round(World.frameRate/60);
   
//   if (count>0 && count % 100===0){
//    playSound("checkPoint.mp3");
//   }
   
  if(keyDown("space") && trex.y >=150){
    trex.velocityY = -12 ;
   
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  spawnClouds();
  spawnObstacle();
  
  if (trex.isTouching(obstacleGroup)){
    // trex.velocityY=-10;
     // playSound("jump.mp3");
    
    gameState="end";
    // playSound("die.mp3");
  }
  
  }
  
  else if (gameState==="end"){
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      gameOver.visible=true;
      restart.visible=true;
      trex.addImage("collided",trex_collided);
      trex.velocityY=0;
  
  }
  
  trex.collide(invisibleGround);
  
  if (mousePressedOver(restart)){
       gameState="play";
       reset();
  }
  
  drawSprites();
}

function spawnClouds(){
  if (World.frameCount%80==0){
    var cloud = createSprite(600,20,10,10)
    cloud.addImage("cloud",cloudImage)
    cloud.y= Math.round(random(10,50))
    cloud.velocityX=-3
    cloud.lifetime=200
    cloudGroup.add(cloud)
  } 
}

function spawnObstacle(){  
  if (World.frameCount% 60==0){
    var cactus=createSprite(600,170,10,10)
    // cactus.debug= true;
    var rand = Math.round(random(1,6))
    
    switch(rand){
    case 1: cactus.addImage("cactus1",obstacle1);
    break;
    
    case 2: cactus.addImage("cactus2",obstacle2);
     break;
     
     case 3: cactus.addImage("cactus3",obstacle3);
     break;
     
     case 4: cactus.addImage("cactus4",obstacle4);
     break;
     
     case 5: cactus.addImage("cactus5",obstacle5);
     break;
     
     case 6: cactus.addImage("cactus6",obstacle6);
     break;

}
    cactus.scale=0.5
    cactus.velocityX=-(4+Math.round(count/100));
    cactus.lifetime=200
    obstacleGroup.add(cactus);
    
  }
}

function reset(){
   gameOver.visible= false;
   restart.visible= false;
   obstacleGroup.destroyEach();
   cloudGroup.destroyEach();
   count=0;
   gameState="play";
   trex.addAnimation("running",trex_running);
}
