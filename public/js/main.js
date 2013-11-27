window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var add_event_listeners = function() {
  // body.addEventListener("keydown", key_down, false);
  // body.addEventListener("keyup", key_up, false);
  // body.addEventListener("keypress", key_press, false);
  // body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  // body.addEventListener("mousemove", mouse_move, false);
};

var init_browser = function() {
  // console.log('debug: init_browser called');
	body = document.getElementsByTagName("body")[0];
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 5;
	context = canvas.getContext('2d');
	body.appendChild(canvas);
  add_event_listeners();
  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
  // context.font = "16px Arial";
};

var init_game = function() {
};

var init = function() {
  init_browser();
  init_game();
};

var render = function() {
};

var draw = function() {
};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  draw();
};

var start = function() {
  init();
  loop();
};

window.onload = start;

