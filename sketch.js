var bgImage,injectionImage,virusImage,virus2Image,virus3Image;
var injection,corona
var virusGroup;
var invisibleGround;
var gameState = "play"
var life = 3
var score = 0
var dieSound,explositionSound;
var gameOverImage,gameOver;

function preload(){
  bgImage = loadImage("images/bg.jpg")
  injectionImage = loadImage("images/injection.png")
  virusImage = loadAnimation("images/virus.png")
  virus2Image = loadAnimation("images/virus2.png")
  virus3Image = loadAnimation("images/virus3.png")
  gameOverImage = loadImage("images/gamrOver.png")
  dieSound = loadSound("Sounds/die.mp3")
  explositionSound = loadSound("Sounds/explosion.mp3")
}

function setup() {
  createCanvas(displayWidth, displayHeight-100)

  injection = createSprite(200,500,20,20)
  injection.addImage("injectionImage", injectionImage)
  injection.scale = 0.3

  invisibleGround = createSprite(680, 650, displayWidth, 20)
  invisibleGround.visible = false

  virusGroup = new Group()
}

function draw(){
  background(bgImage)

  textSize(20)
  text("SCORE : " + score, 0, 50) 
  text("LIFE : " + life, 0, 100)

   if(gameState === "play"){

    injection.x = mouseX
    injection.y = mouseY

    if(injection.isTouching(virusGroup)){
      console.log("hi")
      virusGroup.destroyEach()
      score = score+1
      explositionSound.play()
    }

    if(virusGroup.collide(invisibleGround)){
     // gameState = "end"
     life = life-1
     virusGroup.destroyEach()
    }

    if(life === 0){
      gameState = "end"
    }

    virus()
    


  } 

  if(gameState === "end"){
    virusGroup.destroyEach()
    dieSound.play()
    virusGroup.setVelocityYEach(0)
    gameOver = createSprite(500,400,50,50)
    gameOver.addImage("gameOverImage", gameOverImage)
      
  }


  
  
  drawSprites()
}

function virus(){
  if(frameCount%50 === 0){
  corona = createSprite(Math.round(random(0,1800)), 0, 40, 40)
  corona.velocityY = 10
  corona.addAnimation("virusImage", virusImage)
  corona.scale = 0.2
  virusGroup.add(corona)
  corona.depth = injection.depth
  injection.depth = injection.depth+1 

  }
}