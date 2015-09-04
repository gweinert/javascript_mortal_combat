var MC = MC || {};

MC.Renderer = (function(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 400;

  function drawOtherSpriteGame(){

    function animationLoop(){
      window.requestAnimationFrame(animationLoop);
    
      fighterSprite.update();
      fighterSprite.render();
    }


    var fighterImage = new Image();
    fighterImage.src = "fighter-sprite.gif";

    fighterImage.addEventListener("load", animationLoop);

    function sprite (options) {

      var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;

      that.loop = options.loop;

      that.update = function() {

        tickCount += 1;
      
        if (tickCount > ticksPerFrame) {
        
          tickCount = 0;
          
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
            // Go to the next frame
              frameIndex += 1;
            }
            else if (that.loop) {
              frameIndex = 0;
            }
        }

      };

      that.render = function () {

        //draw the animation
        that.context.drawImage(
             that.image,
             frameIndex * that.width / numberOfFrames,
             0,
             that.width / numberOfFrames,
             that.height,
             0,
             0,
             that.width / numberOfFrames,
             that.height);
      };

      return that;
    }

    var fighterSprite = sprite({
      context: canvas.getContext("2d"),
      width: 100,
      height: 100,
      image: fighterImage
    });

    
  }
    
    

  function drawGame(players){
    ctx.clearRect(0, 0, 700, 500);
    drawPlayers(players[0]);
    drawPlayers(players[1]);
    drawHealth(players[0], players[1]);
  }

  function drawPlayers(player){
    //set vars
    x = player.pos.x;
    y = player.pos.y;
    height = player.height;
    width = player.width;
    punchBool = player.punching;
    punchDir = player.punchDirection;
    hitBool = player.hit;
    dead = player.dead();
    color = player.color;

    //draw body
    drawPlayerBody(x, y, hitBool);

    
    //draw head
    ctx.strokeStyle = color;
    var path = new Path2D();
    path.arc((x + 5), (y - 20), 15, 0, Math.PI*2, false);
    ctx.stroke(path);

    //draw punch
    drawPunchAction(x, y, punchBool, punchDir);

    
  }

  function drawPunchAction(x, y, punchBool, direction){
    if( punchBool ){
      if(direction === "left"){
        ctx.fillRect(x, y +20, -50, 20);
      }
      else{
        ctx.fillRect(x, y +20, 50, 20);
      }
    }
  }

  function drawPlayerBody(x, y, hitBool){
    if(hitBool === true){
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, width, height);
    }
    else{
       ctx.fillStyle = "black";
       ctx.fillRect(x, y, width, height);
    }
  }

  function drawHealth(player1, player2){
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1",20,30);
    ctx.rect(20, 50, 100, 20);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "red";
    ctx.fillRect(20, 50, player1.health, 20);
    ctx.stroke();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Player 2",300,30);
    ctx.rect(300, 50, 100, 20);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "red";
    ctx.fillRect(300, 50, player2.health, 20);
    ctx.stroke();

  }
  


  // function drawSpriteGame(){
  //   spritesheet = new SpriteSheet('fighter-sprite.gif', 125, 125);
  //   walk = new Animation(spritesheet, 3, 0, 15);

  //   function animate(){
  //     requestAnimFrame(animate);
  //     ctx.clearRect(0, 0, 300, 300);
  //     walk.update();
  //     walk.draw(12.5, 12.5);
  //     console.log("sprite");
  //   }
  // }

  // function SpriteSheet(path, frameWidth, frameHeight){

  //   this.image = new Image();
  //   this.frameWidth = frameWidth;
  //   this.frameHeight = frameHeight;
  //   // var framesPerRow;


  //   //calc the number of frames in a row after image loads
  //   var self = this;
  //   this.image.onload = function(){
  //     self.framesPerRow = Math.floor(self.image.width/self.frameWidth);
  //   };

  //   this.image.src = path;
  // }

  // function Animation(spritesheet, frameSpeed, startFrame, endFrame){

  //   var animationSequence = [];
  //   //the current frame to draw
  //   var currentFrame = 0;
  //   //keep track of frame rate
  //   var counter = 0;

  //   for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
  //   animationSequence.push(frameNumber);

  //   this.update = function(){

  //     //update to next frame when it is time
  //     if(counter == (frameSpeed - 1)){
  //       currentFrame = (currentFrame + 1)%endFrame;
  //     }

  //     //update the counter
  //     counter = (counter + 1)% frameSpeed;
  //   };

  //   //Draw the current fram
  //   this.draw = function(x, y){

  //     //get row and colum of the frame
  //     var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
  //     var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
 
  //     ctx.drawImage(
  //       spritesheet.image,
  //       col * spritesheet.frameWidth, row * spritesheet.frameHeight,
  //       spritesheet.frameWidth, spritesheet.frameHeight,
  //       x, y,
  //       spritesheet.frameWidth, spritesheet.frameHeight);
  //   };


  // }


  return{
    // drawBg: drawBg,
    drawGame: drawGame,
    drawOtherSpriteGame: drawOtherSpriteGame
  };

  // var fighterImage = new Image();
  // fighterImage.src = "fighter-sprite.gif";

  // function sprite (options) {

  //   var that = {};

  //   that.context = options.context;
  //   that.width = options.width;
  //   that.height = options.height;
  //   that.image = options.image;

  //   that.render = function () {

  //     //draw the animation
  //     that.context.drawImage(
  //          that.image,
  //          0,
  //          0,
  //          that.width,
  //          that.height,
  //          0,
  //          0,
  //          that.width,
  //          that.height);
  //   };

  //   return that;
  // }

  // var fighterSprite = sprite({
  //   context: canvas.getContext("2d"),
  //   width: 100,
  //   height: 100,
  //   image: fighterImage
  // });



})();