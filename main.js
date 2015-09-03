var MC = MC || {};

MC.MainModule = (function(){
  
  var keys = {
                37: moveLeft,
                38: jump,
                39: moveRight,
                40: crouch,
                32: punch
              };

  var player1;
  var AI;
  var startAIPunchTime = new Date().getTime();
  var startPlayer1JumpTime = new Date().getTime();
  var players = [];

  function init(){
    console.log("Initializing Main...");
    
    MC.FighterModule.buildFighter();
    MC.FighterModule.buildEnemy();
    
    player1 = MC.FighterModule.fighter;
    players.push(player1);
    console.log(players);
    AI = MC.FighterModule.enemy;
    players.push(AI);

    _listenForKeyCodes();

    _startGameLoop();
  }

  function _startGameLoop(){
    var gameLoop = setInterval(function(){

      
      // MC.Renderer.drawBg();
      // MC.Renderer.drawEnemy();
      // MC.Renderer.drawFighter();

      MC.Renderer.drawGame(MC.MainModule.players);
      
      player1.setPunchDirectionTo(AI);
      AI.setPunchDirectionTo(player1);
      
      AIMoveToPlayer();
      
      if(new Date().getTime() - startAIPunchTime > 5000){
        AIPunch();
      }

      if(player1.dead() || AI.dead()){
        clearInterval(gameLoop);
      }
    
    }, 100);
  }

  function _listenForKeyCodes(){
    
    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }
    });
  }

  function moveLeft(){
    player1.moveFighterLeft();
  }

  function moveRight(){
    player1.moveFighterRight();
  }

  function jump(){
    if(new Date().getTime() - startPlayer1JumpTime > 2000){
      player1.jumpFighter();
      startPlayer1JumpTime = new Date().getTime();
    }

  }

  function crouch(){
    player1.crouchFighter();
  }

  function punch(){
    player1.fighterPunch();
    console.log("player1 punched");
    MC.FighterModule.enemy.takeDamageFrom(player1);

    // console.log(MC.FighterModule.enemy.health);
  }

  function AIPunch(){
    AI.fighterPunch();
    console.log("AI punched");
    player1.takeDamageFrom(AI);
    startAIPunchTime = new Date().getTime();
    
  }

  function AIMoveToPlayer(){
    if(player1.pos.x > AI.pos.x){
      AI.pos.x += 2;
    }
    else{
      AI.pos.x -= 2;
    }
  }



  return {
    init: init,
    players: players
  };

})();

$(document).ready(function(){
  MC.MainModule.init();
});

