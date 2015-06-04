gameStream = new Meteor.Stream('game');

if (Meteor.isClient) {

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



}

var jimmy ="";
var glenn;
// var bomb;
var boxes;
var jimmyLeft=null;
var jimmyRight=null;
var jimmyUp=null;
var jimmyDown=null;
var glennLeft=null;
var glennRight=null;
var glennUp=null;
var glennDown=null;
var text;
var over = false;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.setBoundsToWorld();
    over = false;
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


  game.physics.arcade.collide(jimmy, boxes);
  game.physics.arcade.collide(jimmy, bombs);
  game.physics.arcade.collide(jimmy, fires, die, null, this);
  game.physics.arcade.collide(boxes, fires, killfire, null, this);
  game.physics.arcade.collide(bombs, fires, explode, null, this);

  game.physics.arcade.collide(glenn, boxes);
  game.physics.arcade.collide(glenn, bombs);
  game.physics.arcade.collide(glenn, fires, die, null, this);

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
        jimmy.body.velocity.x = -100;
        
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || jimmyRight)
    {
        jimmy.body.velocity.x = 100;
        
       }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || jimmyUp)
    {
         jimmy.body.velocity.y = -100;
       
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || jimmyDown)
    {
       jimmy.body.velocity.y = 100;
      
      }

///////////////////////////////////

      
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) || glennLeft)
    {
        glenn.body.velocity.x = -100;
        
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) || glennRight)
    {
        glenn.body.velocity.x = 100;
        
       }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W) || glennUp)
    {
         glenn.body.velocity.y = -100;
       
       }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) || glennDown)
    {
       glenn.body.velocity.y = 100;
      
      }

};


function setbomb(player, type){
  var self = this;
  
      self.bomb = bombs.create(player.x, player.y+45, type);
      bomb.body.collideWorldBounds = true;
      bomb.body.bounce.setTo(1, 1);
      bomb.body.mass = 0.05;
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

function gameover(winner){
  if(text){
   text.destroy();
  }
     text = game.add.text(game.world.centerX, game.world.centerY, "- Game Over -\n "+winner+" wins", { font: "65px Arial", fill: "#ff0044", align: "center" });
    text.anchor.setTo(0.5, 0.5);
    over = true;

}

function restart() {

game.state.restart();

}



  Template.bomberman.helpers({

  });

  Template.bomberman.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
