const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit;
var rope, rope2, rope3;
var fruit_con, fruit_con2, fruit_con3;
var blink;
var eat;
var sad;
var balloon;

var canvasWidth
var canvasHeight;

var air_sound;
var drop_sound;
var sad_sound;
var eating_sound;
var bk_music;
var ropecut_sound;

var bg_img;
var food;
var rabbit;
var button;
var muteButton

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbitImg = loadImage('Rabbit.png');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  air_sound = loadSound("air.wav");
  drop_sound = loadSound("drop.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3");
  bk_music = loadSound("sound1.mp3");
  ropecut_sound = loadSound("rope_cut.mp3");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true
  eat.looping = false;
  sad.looping = false;

}

function setup() {
  var isMobile = /iPhone | iPad | iPod | Android/i.test(navigator.userAgent);
  if(isMobile){
    canvasWidth = displayWidth
    canvasHeight = displayHeight
    createCanvas(displayWidth + 80, displayHeight);

  }
  else{
    canvasWidth = windowWidth
    canvasHeight = windowHeight

    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, canvasHeight, 600, 20);

  rope = new Rope(7, {
    x: 110,
    y: 120
  });

  rope2 = new Rope(8, {
    x: 340,
    y: 80
  });

  rope3 = new Rope(8, {
    x: 420,
    y: 220
  });

  fruit = Bodies.circle(300, 300, 20);

  bk_music.play();
  bk_music.setVolume(0.5);

  button = createImg("cut_button.png");
  button.position(90, 100);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg("cut_button.png");
  button2.position(320, 60);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.position(400, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  /*balloon = createImg("balloon.png");
  balloon.position(50, 250);
  balloon.size(150, 100);
  balloon.mouseClicked(airBlow);*/

  muteButton = createImg("mute.png");
  muteButton.position(450, 20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit = createSprite(250, canvasHeight - 80, 100, 100)
  rabbit.scale = 0.2;

  rabbit.addAnimation("blinking", blink)
  rabbit.addAnimation("eating", eat)
  rabbit.addAnimation("crying", sad)
  rabbit.changeAnimation("blinking")

  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con2 = new Link(rope2, fruit);
  fruit_con3 = new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

}

function draw() {
  background(51);

  image(bg_img, 0, 0, displayWidth + 80, displayHeight + 80);

  rope.show();
  rope2.show();
  rope3.show();

  ground.show();

  if (fruit != null) {

    image(food, fruit.position.x, fruit.position.y, 70, 70);

  }

  if (collision(fruit, rabbit) === true) {

    rabbit.changeAnimation("eating")
    eating_sound.play();

  }

  if (collision(fruit, ground.body) === true) {

    rabbit.changeAnimation("crying")
    sad_sound.play();
    bk_music.stop();

  }

  Engine.update(engine);
  drawSprites();

}

function drop() {

  ropecut_sound.play();


  rope.break();
  fruit_con.detach();
  fruit_con = null;

}

function drop2() {

  ropecut_sound.play();


  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;

}

function drop3() {

  ropecut_sound.play();


  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;

}



function collision(body, sprite) {

  if (body != null) {

    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);

    if (distance <= 80) {

      World.remove(engine.world, fruit);
      fruit = null
      return true

    } else {

      return false

    }

  }



}

function airBlow(){
  Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0.00})
  air_sound.play();

}

function mute(){

  if(bk_music.isPlaying()){

    bk_music.stop();

  }
  else{

    bk_music.play();

  }

}