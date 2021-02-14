var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundimg, background1;
var crewmateimg, crewmate;
var dead, deadImg
var music, musicX;
var killSound;
var restartImg, gameoverImg;
var imposterImg, imposter1, imposterGroup;
var invisibleGround;

var score=0;


function preload(){
  
 backgroundimg = loadImage("background.jpg");
 crewmateimg = loadImage("crewmate.png");
 imposterImg = loadImage("imposter.png");
 deadImg = loadImage("dead.png");
 musicX = loadSound("music.mp3");
 restartImg = loadImage("restart.png");
 gameoverImg = loadImage("gameover.png");
  killSound = loadSound("killsound.mp3");

  
 

  
  
  
  imposterGroup = new Group(); 


 
  
}

function setup() {
  createCanvas(600,600);
  musicX.loop();
  
  background1 = createSprite(300,300);
  background1.addImage(backgroundimg);
  background1.velocityY = 1;
  background1.scale = 1;
  
  crewmate = createSprite(280,420);
  crewmate.addImage(crewmateimg);
  crewmate.scale = 0.3;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameover.scale = 0.5;
  restart.scale = 0.5;
  
 
   crewmate.setCollider("circle",0,0,10);
  //crewmate.debug = true
  
  invisibleGround = createSprite(10,500,1500,10);
  invisibleGround.visible = false;
  
  
}

function draw() {
  background(0);
  
  
  if(gameState === PLAY){

    gameover.visible = false;
    restart.visible = false;
    
  score = score + Math.round(getFrameRate()/60);
    
  if (background1.y>400){
    background1.y = 300;
 }
  
   if (keyDown("W")){
      crewmate.velocityY = -5;
      }
  
  if (keyDown("A")){
      crewmate.velocityX = -5;
      }
  
  if (keyDown("D")){
      crewmate.velocityX = 5;
      }
  
  crewmate.velocityY = crewmate.velocityY+0.8;
    
    
    spawnImposter();
  
  
   if (imposterGroup.isTouching(crewmate) || crewmate.collide(invisibleGround)){
     killSound.play();
    gameState = END;
    }
    
   
     
    
  }
 
  else if (gameState === END) {
     crewmate.addImage(deadImg)
    
     gameover.visible = true;
      restart.visible = true;
    
     background1.velocityY = 0;
      crewmate.velocityY = 0;
      crewmate.velocityX = 0;
    
    imposterGroup.setLifetimeEach(-1);
    
     imposterGroup.setVelocityXEach(0);
     imposterGroup.setVelocityYEach(0);
    
   
  }
  
   if(mousePressedOver(restart)) {
     reset(); 
    }
  
 drawSprites();
  
  textSize(25)
  fill("red")
  text("Score: "+ score, 400,50);
}

function reset(){
  gameState = PLAY; 
  gameover.visible = false;
  restart.visible = false;
  
  imposterGroup.destroyEach();
  
  crewmate.addImage(crewmateimg)
  
  score = 0;
  
 background1.velocityY = 1;
}


function spawnImposter(){
  if (frameCount%240===0){
    var imposter1 = createSprite(Math.round(random(90,200)),Math.round(random(90,400)))
    imposter1.addImage(imposterImg);
    imposter1.scale = 0.3
    imposter1.velocityX = 3;
    imposter1.velocityY = -3
    //imposter1.x = Math.round(random(110,200));
    imposter1.lifetime = 800;
    imposterGroup.add(imposter1)
    imposter1.depth = crewmate.depth;
    crewmate.depth = crewmate.depth + 1;
    
  }
      if (frameCount%300===0){
    var imposter2 = createSprite(Math.round(random(280,400)),Math.round(random(190,500)))
    imposter2.addImage(imposterImg);
    imposter2.scale = 0.3
    imposter2.velocityX = -4;
        imposter2.velocityY = -4
    //imposter1.x = Math.round(random(110,200));
    imposter2.lifetime = 800;
    imposterGroup.add(imposter2)
        imposter2.depth = crewmate.depth;
    crewmate.depth = crewmate.depth + 1;
    
        
  
  }
}





