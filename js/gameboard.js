$(document).ready(function(){
  $('#share').click(function(){
    $('#media').show();
    
    
    
  });
  $('#red').click(function(){
    $('body').attr("class","redspraycan"); 
  
  });
  $('#blue').click(function(){
    $('body').attr("class","bluespraycan"); 
  
  });
  $('#yellow').click(function(){
    $('body').attr("class","yellowspraycan"); 
  
  });
  $('#green').click(function(){
    $('body').attr("class","greenspraycan"); 
  
  });
  // variable for the canvas 
var gameboard = getCanvas();
// variable for the image url 
var brickwall = "https://s-media-cache-ak0.pinimg.com/736x/94/aa/66/94aa6684bdc152457d6983e58fd24bd2.jpg";
imageInput (brickwall, gameboard);

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
}

