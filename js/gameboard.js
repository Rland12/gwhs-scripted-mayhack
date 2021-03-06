/**
 * This is a function that takes a str and a sperator ( also a string ),
 * that strips a string with any sperator found in it.
 * @param {string} str the given a string to transform
 * @param {string} sep the sperator to find in the given string
 * Ex:
 * str = 'blahHEYblah';
 * strip(str, 'blah'); // "HEY"
 */
function strip(str, sep) {
  return str.split(sep).join("");
}

/**
 * This is a helper function that gets all of the search
 * params in the current href given.
 */
window.location.getSearchParams = function (url) {
  var search = url || this.search;
  if (search.trim().length !== 0) {
    search = search.slice(1);    
    var splitSearchString = search.split('&');

    var searchObject = {};
    for (var i in splitSearchString) {
      var str = splitSearchString[i].split('=')
      var name = str[0];
      var value = str[1];
      searchObject[name] = strip(value, "%22");
    }
    return searchObject;
  }
  return undefined;
}

/**
 * This gets the specfic search param in the href
 */
window.location.getSearchParam = function(name) {
  return this.getSearchParams()[name];
}

/**
 * This is the canvase class that is just a wrapper/refactor of the previous code base.
 */
function canvas() {
  // the canvas element on the web page
  this.canvasContext = $('#gameboard').get(0).getContext("2d");
  
  // the canvas's element offset
  this._canvasOffet = $('#gameboard').offset();
  
  // the image being given by google MAP API in the href
  this.imageUrl = strip(location.search.slice(1).split('screenshot')[1], '%22').slice(1);

  // the color the paint brush is using
  this.color = '';
  
  /**
   * This renders the image into the canvas and sets the
   * hieght and with of the image.
   */
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
  
  /**
   * This chnages the color of the paint brush
   * @param {string} color The color choosen
   */
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
          return;
        } else {
          console.log('color does not exist')
          return;
        }
    }
  }

  /**
   * This this takes the the current clinet mouse x and y coordinates on the web page
   * and gets the offset in order to draw to the canvas.
   * This calcuates the radius of the brashes dilation in size.
   * @param {number} mouseX mouse x position
   * @param {number} mouseY mouse y position
   */
  this.draw = function(mouseX, mouseY) {
    var x = mouseX - this._canvasOffet.left;
    var y = mouseY - this._canvasOffet.top;
    var end = Math.PI * 2;
    var radius = 5; // the size is the radius in pixels    
    var start = 0;

    // if x & y doesnt exist, get out of the function
    if (!x || !y) {
      console.log("x: ", x, "y: ", y);
      return false;
    }

    // the shape that your drawing
    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, radius, start, end);
    //calling the variable to the colors
    this.canvasContext.fillStyle = this.color;
    // filling the circles 
    this.canvasContext.fill();
  }

  // calls the method once the instance is made
  this.imageInput();
}

$(document).ready(function(){
  var usersCanvas = new canvas();

  // $('#share').click(function(){
  //   $('#media').show();
  // });

  $('.color').click(function () {
    var color = $(this).attr('id');
    return usersCanvas.setColor(color);
  });
  
  $('#gameboard').mousemove(function (event) {
    return usersCanvas.draw(event.pageX, event.pageY);
  });
});