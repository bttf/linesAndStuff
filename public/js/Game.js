function Game() {
  this.particles = [];
  this.particles.push(new Particle(0));
  this.particlesMax = 48;

  this.tick = 0;
}

Game.prototype.init = function(canvas) {
  this.canvas = canvas;
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].init(canvas);
  }
};

Game.prototype.render = function(time) {
  for (var i = 0; i < this.particles.length; i++) {
    if (i - 1 >= 0) {
      this.particles[i].render(time, this.particles[i-1]);
    }
    else {
      this.particles[i].render(time, this.particles[i]);
    }
  }
  if (this.tick % 10 === 0 && this.particles.length < this.particlesMax) {
    this.particles.push(new Particle(this.particles.length));
    this.particles[this.particles.length - 1].init(this.canvas);
  }

  this.tick++;
};

Game.prototype.draw = function(context) {
  context.fillStyle = '#181818';
  context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].draw(context);
  }
};

/**
 * Particle
 **/
function Particle(index) {
  this.index = index;
  this.colorH = 0;
  this.x = null;
  this.y = null;
  this.radius = null;
  this.tick = 0;
  this.angle = 10;
  this.angleIncrement = 0.08;
  this.lineX = null;
  this.lineY = null;
}

Particle.prototype = {
  init: function(canvas) {
    this.canvas = canvas;
    if (this.index % 2 === 0) {
      this.x = (this.canvas.width / 2) + 25;
      this.y = (this.canvas.height / 2);
    }
    else {
      this.x = (this.canvas.width / 2) - 150;
      this.y = (this.canvas.height / 2) ;
    }
    this.radius = 4;
  },

  render: function(time, prevParticle) {
    var speed = 15;

    this.color = 'hsl('+this.colorH % 360 + ', 50%, 50%';

    if (this.index % 2 === 0) {
      this.x += (Math.cos((Math.PI * 2) + (this.angle)) * speed);
      this.y += (Math.sin((Math.PI * 2) + (this.angle)) * speed);
    }
    else {
      this.x += (Math.cos((Math.PI * 2) - (this.angle)) * speed);
      this.y += (Math.sin((Math.PI * 2) - (this.angle)) * speed);
    }

    if (prevParticle) {
      this.lineX = prevParticle.x;
      this.lineY = prevParticle.y;
    }

    this.angle += this.angleIncrement;
    this.colorH += 0.5;
  },

  draw: function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fill();

    if (this.lineX && this.lineY) {
      context.strokeStyle = this.color;
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.lineX, this.lineY);
      context.stroke();
    }
  }
};
