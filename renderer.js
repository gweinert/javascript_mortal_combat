var MC = MC || {};

MC.Renderer = (function(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 400;

  var fighterImage = new Image();
  fighterImage.src = "fighter-sprite.gif";

  function sprite (options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function () {

      //draw the animation
      that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           0,
           0,
           that.width,
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

  function drawBg(){

  }

  function drawGame(players){
    ctx.clearRect(0, 0, 500, 500);
    drawPlayers(players[0]);
    drawPlayers(players[1]);
  }

  function drawPlayers(player){
    x = player.pos.x;
    y = player.pos.y;
    height = player.height;
    width = player.width;
    punchBool = player.punching;
    punchDir = player.punchDirection;
    hitBool = player.hit;
    // console.log(hitBool);
    dead = player.dead();
    color = player.color;

    drawPlayerHit(x, y, hitBool);
    //body
    // ctx.fillRect(x, y, width, height);
    var path = new Path2D();
    
    //head
    ctx.strokeStyle = color;

    path.arc((x + 5), (y - 20), 15, 0, Math.PI*2, false);
    ctx.stroke(path);

    //punch
    drawPunchAction(x, y, punchBool, punchDir);

    //hit
    
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

  function drawPlayerHit(x, y, hitBool){
    console.log(hitBool);
    if(hitBool === true){
      ctx.fillStyle = "red";
      console.log("hit!!!!!");
      ctx.fillRect(x, y, width, height);
      
    }
    else{
       ctx.fillStyle = "black";
       ctx.fillRect(x, y, width, height);
    }
  }


  
  // function drawFighter(){

  //   x = MC.FighterModule.fighter.pos.x;
  //   y = MC.FighterModule.fighter.pos.y;
  //   height = MC.FighterModule.fighter.height;
  //   width = MC.FighterModule.fighter.width;
  //   punching = MC.FighterModule.fighter.punching;
  //   punchDir = MC.FighterModule.fighter.punchDirection;
  //   dead = MC.FighterModule.fighter.dead();
    
  //   ctx.clearRect(0, 0, 500, 500);
  //   ctx.strokeStyle="white";
  //   ctx.fillRect(x, y, width, height);
  //   var path = new Path2D();
  //   //head
  //   // path.moveTo(65, 230);
  //   path.arc((x + 5), (y - 20), 15, 0, Math.PI*2, false);
  //   ctx.stroke(path);

  //   //punch/arm
  //   if(punching){
  //     if(punchDir === "left"){
  //       ctx.fillRect(x, y +20, -50, 20);
  //     }
  //     else{
  //       ctx.fillRect(x, y +20, 50, 20);
  //     }
  //   }
  //   ctx.strokeStyle="#FF0000";
  //   ex = MC.FighterModule.enemy.pos.x;
  //   ey = MC.FighterModule.enemy.pos.y;
  //   eheight = MC.FighterModule.enemy.height;
  //   ewidth = MC.FighterModule.enemy.width;
  //   epunching = MC.FighterModule.enemy.punching;
  //   epunchDir = MC.FighterModule.enemy.punchDirection;
  //   edead = MC.FighterModule.enemy.dead();
  //   // ctx.clearRect(0, 0, 500, 500);
  //   if(edead){
  //     ctx.fillRect(ex, ey, ewidth, eheight - 50);
  //     ctx.fillStyle="#FF0000";
  //     var epath = new Path2D();
  //     //head
  //     // path.moveTo(65, 230);
  //     epath.arc((ex + 5), (ey - 20), 15, 0, Math.PI*2, false);
  //     ctx.stroke(epath);
  //   }
  //   else{

  //     ctx.fillRect(ex, ey, ewidth, eheight);
  //     var epath = new Path2D();
  //     //head
  //     // path.moveTo(65, 230);
  //     epath.arc((ex + 5), (ey - 20), 15, 0, Math.PI*2, false);
  //     ctx.stroke(epath);

  //     //punch/arm
  //     if(epunching){
  //       if(epunchDir === "left"){
  //         ctx.fillRect(ex, ey +20, -50, 20);
  //       }
  //       else{
  //         ctx.fillRect(ex, ey +20, 50, 20);
  //       }
  //     }
  //   }
  // }



  return{
    drawBg: drawBg,
    drawGame: drawGame
  };



})();