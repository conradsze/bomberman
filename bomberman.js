gameStream = new Meteor.Stream('game');

if (Meteor.isClient) {

  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});




  Template.bomberman.helpers({
    bomberman: function(){

var game = new Phaser.Game(900, 636, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });


function preload() {

    game.load.image('jimmy', 'assets/img/jimmyball.png');
    game.load.image('glenn', 'assets/img/glenn.png');
    game.load.image('bomb', 'assets/img/bomb.png');
    game.load.image('bg', 'assets/img/bg.jpg');
    game.load.image('box', 'assets/img/box.jpg');
    game.load.image('fire', 'assets/img/fire.png');
    game.load.image('tomb', 'assets/img/rip.png');
    game.load.image('star', 'assets/img/ninjastar.png');
    game.load.image('shoes', 'assets/img/shoes.jpeg');
    game.load.image('food', 'assets/img/food.png');
    game.load.image('skate', 'assets/img/skateboards.png');
    game.load.image('cane', 'assets/img/Cane.png');



}

var jimmy ={};
var glenn;
var jimmyBoxes = true;
var glennBoxes = true;
// var bomb;
var boxes;
var jimmyLeft=null;
var jimmyRight=null;
var jimmyUp=null;
var jimmyDown=null;
var jimmySpeed=null;
var glennLeft=null;
var glennRight=null;
var glennUp=null;
var glennDown=null;
var glennSpeed=null;
var text;
var over = false;
var shoes;
var skate; 
var food; 
var cane; 

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.setBoundsToWorld();
    over = false;
    jimmySpeed=100;
    jimmyBoxes = true;
    glennBoxes = true;
    glennSpeed = 100;

        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){gameStream.emit('Movement',  {dir:"left", name: jimmy.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){gameStream.emit('Movement',  {dir:"right", name: jimmy.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function(){gameStream.emit('Movement',  {dir:"up", name: jimmy.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function(){gameStream.emit('Movement',  {dir:"down", name: jimmy.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(function(){gameStream.emit('Movement',  {x: jimmy.x, y: jimmy.y, dir:"left", name: jimmy.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(function(){gameStream.emit('Movement',  {x: jimmy.x, y: jimmy.y, dir:"right", name: jimmy.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onUp.add(function(){gameStream.emit('Movement',  {x: jimmy.x, y: jimmy.y, dir:"up", name: jimmy.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onUp.add(function(){gameStream.emit('Movement',  {x: jimmy.x, y: jimmy.y, dir:"down", name: jimmy.name, key: false})});
      
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){
        if (jimmy.alive){
        gameStream.emit('bombSet',{x: jimmy.x, y: jimmy.y, type:"bomb"});
        setbomb(jimmy, 'bomb');
          }
        });

        // var checkposition = this.game.time.events.loop(500, function(){gameStream.emit('jimmyMove', {x: jimmy.x, y: jimmy.y})}, this);
        // checkposition.timer.start();


        game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function(){gameStream.emit('Movement',  {dir:"left", name: glenn.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function(){gameStream.emit('Movement',  {dir:"right", name: glenn.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function(){gameStream.emit('Movement',  {dir:"up", name: glenn.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function(){gameStream.emit('Movement',  {dir:"down", name: glenn.name, key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.A).onUp.add(function(){gameStream.emit('Movement',  {x: glenn.x, y: glenn.y, dir:"left", name: glenn.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.D).onUp.add(function(){gameStream.emit('Movement',  {x: glenn.x, y: glenn.y, dir:"right", name: glenn.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.W).onUp.add(function(){gameStream.emit('Movement',  {x: glenn.x, y: glenn.y, dir:"up", name: glenn.name, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.S).onUp.add(function(){gameStream.emit('Movement',  {x: glenn.x, y: glenn.y, dir:"down", name: glenn.name, key: false})});
      
        game.input.keyboard.addKey(Phaser.Keyboard.Z).onDown.add(function(){
        if (glenn.alive){
        gameStream.emit('bombSet',{x: glenn.x, y: glenn.y, type:"star"});
        setbomb(glenn, "star");
          }
        });

        // var checkposition = this.game.time.events.loop(500, function(){gameStream.emit('glennMove', {x: glenn.x, y: glenn.y})}, this);
        // checkposition.timer.start();

        var checkposition = this.game.time.events.loop(30000, function(){
          var _x = game.rnd.integerInRange(100, 800); 
          var _y = game.rnd.integerInRange(100, 570);
          var _name = ['shoes', 'skate', 'food', 'cane'][Math.floor((Math.random() * 4))];
          gameStream.emit('newitem',  {x: _x, y: _y, name: _name});
          makeitem(_x,_y, _name);
        }, this);
        checkposition.timer.start();

  game.add.tileSprite(0, 0, 900, 636, 'bg');


    boxes = game.add.group();
    boxes.enableBody = true;
    boxes.physicsBodyType = Phaser.Physics.ARCADE;

    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;


    fires = game.add.group();
    fires.enableBody = true;
    fires.physicsBodyType = Phaser.Physics.ARCADE;

    tombs = game.add.group();
    tombs.enableBody = true;
    tombs.physicsBodyType = Phaser.Physics.ARCADE;


    item = game.add.group();
    item.enableBody = true;
    item.physicsBodyType = Phaser.Physics.ARCADE;



    jimmy = game.add.sprite(780, 50, 'jimmy');
    jimmy.name = "jimmy";
    jimmy.scale.set(0.14);
    game.physics.enable(jimmy, Phaser.Physics.ARCADE);
    jimmy.enableBody = true;
    jimmy.body.collideWorldBounds = true;
    jimmy.body.mass = 0.1;
    jimmy.body.setSize(300,275,0,55);


    glenn = game.add.sprite(50, 50, 'glenn');
    glenn.name = "glenn";
    glenn.scale.set(0.1);
    game.physics.enable(glenn, Phaser.Physics.ARCADE);
    glenn.enableBody = true;
    glenn.body.collideWorldBounds = true;
    glenn.body.mass = 0.1;
    glenn.body.setSize(300,350,0,60);

    for (var j = 0; j < 5; j++)
    {
        for (var i = 0; i < 6; i++)
        {
            var box = boxes.create((115+ i*121) , (93+ j*100) , 'box');
                box.body.immovable = true;

        }
    }
}

  gameStream.on('Movement', function(data){
    if (data.name == "jimmy") {
    if (data.dir == "left") {
    jimmyLeft = data.key
  }
  else if (data.dir == "right"){
    jimmyRight = data.key
  }
  else if (data.dir == "up"){
    jimmyUp = data.key
  }
  else if (data.dir == "down"){
    jimmyDown = data.key
  };

  if (!data.key) {
      jimmy.x = data.x;
      jimmy.y = data.y;
    };

  }
  else if (data.name == "glenn") {
    if (data.dir == "left") {
    glennLeft = data.key
  }
  else if (data.dir == "right"){
    glennRight = data.key
  }
  else if (data.dir == "up"){
    glennUp = data.key
  }
  else if (data.dir == "down"){
    glennDown = data.key
  };

  if (!data.key) {
      glenn.x = data.x;
      glenn.y = data.y;
    };

  }
  })



  gameStream.on('playerDie', function(data){
      if (data.name == "jimmy" && jimmy.alive) {
        var tomb = tombs.create(data.x, data.y+40, 'tomb');
        jimmy.kill()
    }
    else if (data.name == "glenn" && glenn.alive) {
      var tomb = tombs.create(data.x, data.y+40, 'tomb');
      glenn.kill()
    };
  });

  gameStream.on('kick', function(data){
    if(data.name == "jimmy"){
      jimmy.x = data.x;
      jimmy.y = data.y;
      jimmy.body.velocity.x = data.vx;
      jimmy.body.velocity.y = data.vy;}
    else if(data.name == "glenn"){
      glenn.x = data.x;
      glenn.y = data.y;
      glenn.body.velocity.x = data.vx;
      glenn.body.velocity.y = data.vy;}
  });

    gameStream.on('newitem', function(data){
     makeitem(data.x,data.y, data.name);
    })

  // gameStream.on('jimmyMove', function(data){
  //   jimmy.x = data.x;
  //   jimmy.y = data.y;
  // })

  // gameStream.on('glennMove', function(data){
  //   glenn.x = data.x;
  //   glenn.y = data.y;
  // })

  gameStream.on('bombSet', function(data){
    if (data.type=="star"){
      glenn.x = data.x;
      glenn.y = data.y;
    }
    else{
      jimmy.x = data.x;
      jimmy.y = data.y;
    }
    setbomb(data, data.type);
  })

  gameStream.on('restart', function(data){
    restart();
  })



function update(){


  if(!jimmy.alive && !glenn.alive){
    gameover("No one");
  }
  else if(!glenn.alive){
    gameover("Jimmy");
  }
  else if(!jimmy.alive){
    gameover("Glenn");
  }

  if (jimmyBoxes){
    game.physics.arcade.collide(jimmy, boxes);
  };
   game.physics.arcade.collide(jimmy, bombs, function(){ gameStream.emit('kick',  {x: jimmy.x, y:jimmy.y, vx:jimmy.body.velocity.x, vy:jimmy.body.velocity.y, name: "jimmy"})}, null, this);
  game.physics.arcade.collide(jimmy, fires, die, null, this);
  game.physics.arcade.collide(jimmy, shoes, speedup, null, this);
  game.physics.arcade.collide(jimmy, cane, speeddown, null, this);
  game.physics.arcade.collide(jimmy, food, gainmass, null, this);
  game.physics.arcade.collide(jimmy, skate, flyover, null, this);
  game.physics.arcade.collide(boxes, fires, killfire, null, this);
  game.physics.arcade.collide(bombs, fires, explode, null, this);

  if (glennBoxes){
    game.physics.arcade.collide(glenn, boxes);
  };
  game.physics.arcade.collide(glenn, bombs, function(){ gameStream.emit('kick',  {x: glenn.x, y:glenn.y, vx:glenn.body.velocity.x, vy:glenn.body.velocity.y, name: "glenn"})}, null, this);
  game.physics.arcade.collide(glenn, fires, die, null, this);
  game.physics.arcade.collide(glenn, shoes, speedup, null, this);
  game.physics.arcade.collide(glenn, cane, speeddown, null, this);
  game.physics.arcade.collide(glenn, food, gainmass, null, this);
  game.physics.arcade.collide(glenn, skate, flyover, null, this);

  jimmy.body.velocity.x = 0;
    jimmy.body.velocity.y = 0;


glenn.body.velocity.x = 0;
    glenn.body.velocity.y = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && over)
    {
        restart();
        gameStream.emit('restart',  {})
       }


    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || jimmyLeft)
    {
        jimmy.body.velocity.x = -jimmySpeed;
        
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || jimmyRight)
    {
        jimmy.body.velocity.x = jimmySpeed;
        
       }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || jimmyUp)
    {
         jimmy.body.velocity.y = -jimmySpeed;
       
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || jimmyDown)
    {
       jimmy.body.velocity.y = jimmySpeed;
      
      }

///////////////////////////////////

      
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) || glennLeft)
    {
        glenn.body.velocity.x = -glennSpeed;
        
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) || glennRight)
    {
        glenn.body.velocity.x = glennSpeed;
        
       }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W) || glennUp)
    {
         glenn.body.velocity.y = -glennSpeed;
       
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) || glennDown)
    {
       glenn.body.velocity.y = glennSpeed;
      
      }

};


function setbomb(player, type){
  var self = this;
  
      self.bomb = bombs.create(player.x, player.y+45, type);
      bomb.body.collideWorldBounds = true;
      bomb.body.bounce.setTo(1, 1);
      bomb.body.mass = 0.03;
      if(type=="star"){
        self.bomb.scale.set(0.13);
      }
      else{
        self.bomb.scale.set(0.4);
      }
      // bomb.body.immovable = true;
      game.time.events.add(4000, explode, self, self.bomb);
}


function explode(bom){
    if(bom.alive)
    {
      var fire1 = fires.create(bom.x, bom.y, 'fire');
      fire1.body.velocity.y = -300;
      var fire2 = fires.create(bom.x, bom.y, 'fire');
      fire2.body.velocity.y = 300;
      var fire3 = fires.create(bom.x, bom.y, 'fire');
      fire3.body.velocity.x = -300;
      var fire4 = fires.create(bom.x, bom.y, 'fire');
      fire4.body.velocity.x = 300;
      fire1.scale.set(0.7);
      fire2.scale.set(0.7);
      fire3.scale.set(0.7);
      fire4.scale.set(0.7);
      game.time.events.add(5000, function(){fire1.kill()});
      game.time.events.add(5000, function(){fire2.kill()});
      game.time.events.add(5000, function(){fire3.kill()});
      game.time.events.add(5000, function(){fire4.kill()});
  }
    bom.kill();
    console.log("boom!")

}


function killfire(boxes, fire){
    fire.kill();
}

function die(player, fire){

  gameStream.emit('playerDie',  {x: player.x, y: player.y, name: player.name})

    if (player.alive) {
      var tomb = tombs.create(player.x, player.y+40, 'tomb');
      player.kill();
    };

}

function flyover (player, skate) {

  skate.kill();
  if(player.name == "jimmy")
{ jimmyBoxes = false;
  gameStream.emit('kick',  {x: jimmy.x, y:jimmy.y, vx:jimmy.body.velocity.x, vy:jimmy.body.velocity.y, name: "jimmy"})
  game.time.events.add(10000, function(){jimmyBoxes = true});}
  else if(player.name == "glenn")
  {glennBoxes = false;
  gameStream.emit('kick',  {x: glenn.x, y:glenn.y, vx:glenn.body.velocity.x, vy:glenn.body.velocity.y, name: "glenn"})
  game.time.events.add(10000, function(){glennBoxes = true});
  }

}

function speedup(player, shoes){

      shoes.kill();
      if(player.name == "jimmy"){
        jimmySpeed = 150;
        gameStream.emit('kick',  {x: jimmy.x, y:jimmy.y, vx:jimmy.body.velocity.x, vy:jimmy.body.velocity.y, name: "jimmy"})
        game.time.events.add(10000, function(){jimmySpeed = 100});}
      else if(player.name == "glenn"){
       glennSpeed = 150;
       gameStream.emit('kick',  {x: glenn.x, y:glenn.y, vx:glenn.body.velocity.x, vy:glenn.body.velocity.y, name: "glenn"})
       game.time.events.add(10000, function(){glennSpeed = 100});
        }
    }

function speeddown(player, skate){

      cane.kill();
      if(player.name == "jimmy"){glennSpeed = 75;
        gameStream.emit('kick',  {x: jimmy.x, y:jimmy.y, vx:jimmy.body.velocity.x, vy:jimmy.body.velocity.y, name: "jimmy"})
            game.time.events.add(10000, function(){glennSpeed = 100});}
            else if(player.name == "glenn"){
              jimmySpeed = 75;
              gameStream.emit('kick',  {x: glenn.x, y:glenn.y, vx:glenn.body.velocity.x, vy:glenn.body.velocity.y, name: "glenn"})
            game.time.events.add(10000, function(){jimmySpeed = 100});}
    }

function gainmass(player, food){

      food.kill();
      player.body.mass = 0.8;
      game.time.events.add(10000, function(){player.body.mass = 0.1});
    }   
function makeitem(x,y,name){


    if(name =="shoes"){if(shoes){shoes.kill()}; shoes = item.create(x, y, 'shoes');}
    else if(name =="skate"){if(skate){skate.kill()}; skate = item.create(x, y, 'skate');}
    else if(name =="food"){if(food){food.kill()}; food = item.create(x, y, 'food');}
    else if(name =="cane"){if(cane){cane.kill()}; cane = item.create(x, y, 'cane');}

    }   

function gameover(winner){
  if(text){
   text.destroy();
  }
     text = game.add.text(game.world.centerX, game.world.centerY, "- Game Over -\n "+winner+" wins \n Press ENTER to restart", { font: "65px Arial", fill: "#ff0044", align: "center" });
    text.anchor.setTo(0.5, 0.5);
    over = true;

}

    // function addshoes(){shoes = item.create(game.rnd.integerInRange(100, 800), game.rnd.integerInRange(100, 570), 'shoes');};
    // function addskate(){skate = item.create(game.rnd.integerInRange(100, 800), game.rnd.integerInRange(100, 570), 'skate');};
    // function addfood(){food = item.create(game.rnd.integerInRange(100, 800), game.rnd.integerInRange(100, 570), 'food');};
    // function addcane(){cane = item.create(game.rnd.integerInRange(100, 800), game.rnd.integerInRange(100, 570), 'cane');};

function restart() {

game.state.restart();

}

    }
  });

  Template.bomberman.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
