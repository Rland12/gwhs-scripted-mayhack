function strip(str, sep) {
  return str.split(sep).join("")
}
window.location.getSearchParams = function (url) {
  var search = url || this.search;
  if (search.trim().length !== 0) {
    search = search.slice(1);    
    var splitSearchString = search.split('&');

    var searchObject = {};
    for (var i in splitSearchString) {
      var str = splitSearchString[i].split('=')
      var name = str[0]
      var value = str[1]
      searchObject[name] = strip(value, "%22")
    }
    return searchObject
  }
  return undefined
}

window.location.getSearchParam = function(name) {
  return this.getSearchParams()[name]
}


function canvas() {
  // the canvas on the web page
  this.canvasContext = $('#gameboard').get(0).getContext("2d")
  
  // the canvas's offset
  this._canvasOffet = $('#gameboard').offset();
  
  // the image being given by google MAP API
  this.imageUrl = strip(location.search.slice(1).split('screenshot')[1], '%22').slice(1)

  // the color the pain brush is using
  this.color = '';
  
  this.brickwall = "https://s-media-cache-ak0.pinimg.com/736x/94/aa/66/94aa6684bdc152457d6983e58fd24bd2.jpg";
  
  // places the image given on the canvas
  this.imageInput = function() {
    // new image
    var img = new Image();
    var context = this.canvasContext;

    // upon image loading 
    img.onload = function () {
      // positioning and draw the image 
      context.drawImage(img, 0, 0);
    };
    // setting the empty image to an image 
    img.src = this.imageUrl;
    //prevents the image from stretching out 
    img.width = "640px";
    img.height = "480px";
  }
  
  this.setColor = function(color) {
    switch (color) {
      case 'green':
        this.color = "#009933";
        break;
      case 'red':
        this.color = "#ff0000";
        break;
      case 'blue':
        this.color = "#0000ff";
        break;
      case 'yellow':
        this.color = "#ffff00";
        break;
      default:
        if (!color) {
          throw new Error('color given was undefined.')
        } else {
          console.log('color does not exist')
        }
    }
  }

  this.draw = function(mouseX, mouseY) {
    var left = mouseX - this._canvasOffet.left;
    var top = mouseY - this._canvasOffet.top;
    return this.drawCircle(left, top);
  }

  // x-axis and y-axis; draws circle at that position
  this.drawCircle = function(x, y) {
    var end = Math.PI * 2;
    var radius = 5; // the size is the radius in pixels    
    var start = 0;

    // if x & y doesnt exist, get out of the function
    if (!x || !y) {
      console.log("x: ", x, "y: ", y);
      return false;
    }

    // shape that your drawing
    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, radius, start, end);
    //calling the varible to the colors
    this.canvasContext.fillStyle = this.color;
    // filling the circles 
    this.canvasContext.fill();
  }

  this.imageInput();
}

$(document).ready(function(){
  var usersCanvas = new canvas();

  // $('#share').click(function(){
  //   $('#media').show();
  // });

  $('.color').click(function () {
    var color = $(this).attr('id');
    usersCanvas.setColor(color);
  });
  
  $('#gameboard').mousemove(function (event) {
    return usersCanvas.draw(event.pageX, event.pageY);
  });
});