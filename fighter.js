var MC = MC || {};

MC.FighterModule = (function(){


  function Fighter(x, y, color){

    this.pos = {
      x: x, //50
      y: y //200
    };
    
    this.height = 100;
    this.width = 10;

    this.vy = 0;
    this.vx = 0;
    this.health = 100;
    this.punchDirection = "right";
    this.punching = false;
    this.hit = false;
    this.color = color;
    this.crouch = false;

  }

  var model = {};

  var startTime = new Date().getTime();

  Fighter.prototype.jumpFighter = function(){
    if (this.pos.y >100 ){
      this.pos.y -= 120;
      self = this;
      setTimeout( function(){
        self.pos.y+=120;
      }, 900);
    }
  };

  Fighter.prototype.crouchFighter = function(){
    if (this.pos.y > 170 ){
      this.pos.y += 50; //20
      this.height -= 20;
      this.crouch = true;

      self = this;
      setTimeout( function(){
        self.pos.y -=50; //20
        self.height += 20;
        self.crouch = false;
      }, 1000);
    }
  };

  Fighter.prototype.fighterPunch = function(){
    this.punching = true;
    
    //keeps from button mashing punches
    self = this;
    setTimeout( function(){
      self.punching = false;
    }, 1000);
  };

  Fighter.prototype.moveFighterLeft = function(){
    this.pos.x -= 10;
  };

  Fighter.prototype.moveFighterRight = function(){
    this.pos.x += 10;
  };

  Fighter.prototype.takeDamageFrom = function(enemy){
    if( enemy.crouch === false && ( enemy.punching && this.inRange(enemy)) ){
      this.health -= 20;
      this.hit = true;
      setTimeout( function(){
        self.hit  = false;
    }, 2000);
      var self = this;
      console.log(self + "is being hit"+this.hit);
    }
  };

  Fighter.prototype.inRange = function(enemy){
    //arm within 50px
    if(Math.abs(this.pos.x - enemy.pos.x) <= 50){

      return true;
    }
    else{
      return false;
    }
  };

  Fighter.prototype.dead = function(){
    if(this.health <= 0 ){
      var self = this;
      alert(self +" died");
      return true;
    }
    else{
      return false;
    }
  };

  Fighter.prototype.setPunchDirectionTo = function(enemy){
    if( Math.abs(this.pos.x < enemy.pos.x) ){
      this.punchDirection = "right";
    }
    else{
      this.punchDirection = "left";
    }
  };

  model.buildFighter = function(){
    model.fighter =  new Fighter(50, 200, "white");
  };

  model.buildEnemy = function(){
    model.enemy = new Fighter(400, 200, "red");
  };

  // function init(){
  //   buildFighter();
  // }

  // function buildFighter(){
  //   console.log("building fighter");
  //   fighter = new Fighter();
  // }

  // return {
  //   init: init,
  //   fighter: fighter,
  //   Fighter: Fighter
  // };
  return model;

})();

