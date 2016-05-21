$(document).ready(function(){
  $('#share').click(function(){
    $('#media').show();
  });
  $('#red').click(function(){
    $('body').attr("class","redspraycan"); 
  setRed();
  });
  $('#blue').click(function(){
    $('body').attr("class","bluespraycan"); 
  setBlue();
  });
  $('#yellow').click(function(){
    $('body').attr("class","yellowspraycan"); 
  setYellow();
  });
  $('#green').click(function(){
    $('body').attr("class","greenspraycan"); 
  setGreen();
  });
  var url = window.location.href;
console.log(url);
var index = url.indexOf("=");
var img = url.substring(index+1);
console.log(img);
  // variable for the canvas 
var gameboard = getCanvas();
// variable for the image url 
var brickwall = "https://s-media-cache-ak0.pinimg.com/736x/94/aa/66/94aa6684bdc152457d6983e58fd24bd2.jpg";
imageInput (img, gameboard);
drawing ();
});
//START OF DRAWING CODE
//returning a new image
function getImage (){
  return new Image();
}

// select your first gameboard
function getCanvas (){ 
  var canvas = $('#gameboard').get(0);
  return canvas;
}

// places the image given on the canvas
function imageInput (imageUrl, canvas){
  // centext is 2 dimentional 
  var context =  canvas.getContext('2d');
  // new image
  var myImage = getImage();
  // upon image loading 
  myImage.onload = function() {
    // positioning and draw the image 
    context.drawImage(myImage,0,0);
  };  
  // setting the empty image to an image 
  myImage.src = imageUrl;
  myImage.width = "640px";
  myImage.height = "480px";
}
// creating a variable that all the functions can get to
var color;
// just turn it red
function setRed(){
 color = "#ff0000";
}
// just turn it green 
function setGreen(){
  color = "#00ff40";
}
// just turn it blue
function setBlue(){
  color = "#0000ff";
}
// just turn it yellow
function setYellow(){
  color = "#ffff00";
}
// unfinished
function drawCircle(x, y){
  
  if (! x || ! y){
    console.log("Don't know where to go.");
    return false;
  } 
  
  var target = getCanvas();
  var context = target.getContext("2d");
  context.beginPath();
  var radius = 5; // the size is the radius in pixels    
  var start = 0; 
  var end = Math.PI*2;
  context.arc(x, y, radius, start, end);
  context.fillStyle = color;
  context.fill();
  console.log("Anything");
}
function drawing (){
$('#gameboard').click(function(event){
  var offset = $("#gameboard").offset();
  var left = event.pageX - offset.left;
  var top = event.pageY - offset.top;
  drawCircle(left, top);
    });
}
















