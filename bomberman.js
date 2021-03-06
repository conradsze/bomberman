gameStream = new Meteor.Stream('game');
game = "";
if (Meteor.isClient) {

game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('jimmy', 'assets/img/jimmy.png');
    game.load.image('glenn', 'assets/img/glenn.png');
    game.load.image('bomb', 'assets/img/bomb.png');
    game.load.image('bg', 'assets/img/bg.jpg');
    game.load.image('box', 'assets/img/box.jpg');
    game.load.image('fire', 'assets/img/fire.png');
    game.load.image('tomb', 'assets/img/rip.png');


}

var jimmy ="";
var glenn;
// var bomb;
var boxes;
jimmyLeft=null;
jimmyRight=null;
jimmyUp=null;
jimmyDown=null;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.setBoundsToWorld();

        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){gameStream.emit('jimmyLeft',  {key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){gameStream.emit('jimmyRight',  {key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function(){gameStream.emit('jimmyUp',  {key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function(){gameStream.emit('jimmyDown',  {key: true})});
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(function(){gameStream.emit('jimmyLeft',  {x: jimmy.x, y: jimmy.y, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(function(){gameStream.emit('jimmyRight',  {x: jimmy.x, y: jimmy.y, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onUp.add(function(){gameStream.emit('jimmyUp',  {x: jimmy.x, y: jimmy.y, key: false})});
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onUp.add(function(){gameStream.emit('jimmyDown',  {x: jimmy.x, y: jimmy.y, key: false})});
      
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){
        if (jimmy.alive){
        gameStream.emit('bombSet',{x: jimmy.x, y: jimmy.y});
        setbomb(jimmy);
          }
        });

        var checkposition = this.game.time.events.loop(500, function(){gameStream.emit('jimmyMove', {x: jimmy.x, y: jimmy.y})}, this);
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


    jimmy = game.add.sprite(50, 100, 'jimmy');
    jimmy.scale.set(0.3);
    game.physics.enable(jimmy, Phaser.Physics.ARCADE);
    jimmy.enableBody = true;
    jimmy.body.collideWorldBounds = true;

    glenn = game.add.sprite(660, 100, 'glenn');
    glenn.scale.set(0.1);
    game.physics.enable(glenn, Phaser.Physics.ARCADE);
    glenn.enableBody = true;
    glenn.body.collideWorldBounds = true;


    for (var j = 0; j < 5; j++)
    {
        for (var i = 0; i < 6; i++)
        {
            var box = boxes.create((115+ i*121) , (93+ j*100) , 'box');
                box.body.immovable = true;

        }
    }
}

  gameStream.on('jimmyLeft', function(data){
    jimmyLeft = data.key
       if (data.x) {
      jimmy.x = data.x;
      jimmy.y = data.y;
    };
  })

  gameStream.on('jimmyRight', function(data){
   jimmyRight = data.key
  
    if (data.x) {
      jimmy.x = data.x;
      jimmy.y = data.y;
    };
  })

  gameStream.on('jimmyDown', function(data){
   jimmyDown = data.key
      if (data.x) {
      jimmy.x = data.x;
      jimmy.y = data.y;
    };
  })

  gameStream.on('jimmyUp', function(data){
   jimmyUp = data.key
      if (data.x) {
      jimmy.x = data.x;
      jimmy.y = data.y;
    };
  })

  gameStream.on('jimmyMove', function(data){
    jimmy.x = data.x;
    jimmy.y = data.y;
  })

  gameStream.on('glennMove', function(data){
    glenn.x = data.x;
    glenn.y = data.y;
  })

  gameStream.on('bombSet', function(data){
    setbomb(data);
  })

function update(){


  game.physics.arcade.collide(jimmy, boxes);
  game.physics.arcade.collide(jimmy, bombs, syncBombs, null, this);
  game.physics.arcade.collide(jimmy, fires, die, null, this);
  game.physics.arcade.collide(boxes, fires, killfire, null, this);

  game.physics.arcade.collide(glenn, boxes);
  game.physics.arcade.collide(glenn, bombs, syncBombs, null, this);
  game.physics.arcade.collide(glenn, fires, die, null, this);

  jimmy.body.velocity.x = 0;
    jimmy.body.velocity.y = 0;


    jimmy.body.setSize(150,125,5,55);

glenn.body.velocity.x = 0;
    glenn.body.velocity.y = 0;


    glenn.body.setSize(300,350,0,60);


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

      if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        glenn.body.velocity.x = -100;
        gameStream.emit('glennMove', {x: glenn.x, y: glenn.y});
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        glenn.body.velocity.x = 100;
        gameStream.emit('glennMove', {x: glenn.x, y: glenn.y});
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        glenn.body.velocity.y = -100;
        gameStream.emit('glennMove', {x: glenn.x, y: glenn.y});
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        glenn.body.velocity.y = 100;
        gameStream.emit('glennMove', {x: glenn.x, y: glenn.y});
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) 
      {
        if (glenn.alive){
        gameStream.emit('bombSet',{x: glenn.x, y: glenn.y});
        setbomb(glenn);
      }
      }
};


function setbomb(player){
  var self = this;
  
      self.bomb = bombs.create(player.x+10, player.y+40, 'bomb');
      bomb.body.collideWorldBounds = true;
      // bomb.body.immovable = true;
      self.bomb.scale.set(0.4);
      game.time.events.add(4000, explode, self, self.bomb);
}


function explode(bom){
    var fire1 = fires.create(bom.x, bom.y, 'fire');
    fire1.body.velocity.y = -300;
    var fire2 = fires.create(bom.x, bom.y, 'fire');
    fire2.body.velocity.y = 300;
    var fire3 = fires.create(bom.x, bom.y, 'fire');
    fire3.body.velocity.x = -300;
    var fire4 = fires.create(bom.x, bom.y, 'fire');
    fire4.body.velocity.x = 300;
    fire1.scale.set(0.8);
    fire2.scale.set(0.8);
    fire3.scale.set(0.8);
    fire4.scale.set(0.8);
    bom.kill();
    console.log("boom!")

}


function killfire(boxes, fire){
    fire.kill();
}

function die(player, fire){
    var tomb = tombs.create(player.x, player.y+40, 'tomb');
    player.kill();
}

function syncBombs(jimmy, bomb){
  
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
