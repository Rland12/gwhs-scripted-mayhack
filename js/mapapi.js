/**
 * This is a google API wrapper, just most of the same old code base but making them
 * into methods instead of anonymous functions. 
 * @param {string} imageId given img tag #ID on the web page.
 */
function googleMapWrapper(imageId) {
  // the image #ID
  this.imageId = imageId;

  // google maps API key
  // we should not expose this to people our app
  this.googleMapsApiKey = 'AIzaSyCwLY1vDNFqYUY7eSj4kTVwiuW1-XZC55U';
  // url for google geocode api
  this.googleApiGeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  // the element to set the panorama to
  this.googleMapDisplay = document.getElementById('pano')
  
  // the lat and lng given
  this.position;

  // This object holds all the information of the image and street given from the address
  this.screenShot = {
    // the certain hieght width screenshot needed
    height: '640',
    width: '400',

    // other screenshot urls taken
    shots: [],
    // screenshot url
    url: '',
    // location given from panorama
    location: '',
    heading: '',
    pitch: '',
    fov: '',
  }
  // google Maps API panorama object
  this.panorama;
  
  /**
   * This gets the lat and lng coordinates and sets thet to the position property
   * @param {object} position 
   */
  this.assignPosition = function(position) {
    this.position = position;
    return this.renderGoogleMap();
  }

  /**
   * This creates script tag, loads, and renders the google maps panorama
   * on the wbepage. which appends the script tag to the body of web page
   */
  this.renderGoogleMap = function() {
    var googleMapScriptTag = document.createElement('script');
    googleMapScriptTag.type = 'text/javascript';
    googleMapScriptTag.async = true;
    googleMapScriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapsApiKey +'&callback=map.initialize';
    
    return document.getElementsByTagName('body')[0].appendChild(googleMapScriptTag);
  }

  /**
   * this starts the google Maps API to render.
   * But this alsi sets some of the screenshot information
   * to the screenshot object property.
   */
  this.initialize = function() {
    const panorama = new google.maps.StreetViewPanorama(
      this.googleMapDisplay,
      {
        position: this.position
      }
    );
    this.screenShot.location = panorama.position.lat() + "," + panorama.position.lng();
    // special equation for fov to zoom ratio for the 'fov'
    this.screenShot.fov = 103.7587 * Math.pow(0.5051, panorama.pov.zoom);
    this.screenShot.heading = panorama.pov.heading;
    this.screenShot.pitch = panorama.pov.pitch;
  }

  /**
   * This takes the screenshot of the location given
   * BUG: This does not adjust to the current motion or changes in the google Map.
   */
  this.takeScreenShot = function() {
    this.screenShot.url = "https://maps.googleapis.com/maps/api/streetview?size=" + this.screenShot.height + "x" + this.screenShot.height + "&location=" + this.screenShot.location + "&fov=" + this.screenShot.fov + "&heading=" + this.screenShot.heading + "&pitch=" + this.screenShot.pitch + "&key=" + this.googleMapsApiKey;
    this.screenShot.shots.push(this.screenShot.url)

    $(this.imageId).attr("src", this.screenShot.url);
  }
}

var map = new googleMapWrapper('#img');
$(document).ready(function(){

  $("form").submit(function (event) {
    event.preventDefault();
    var address = $('#place').val();
    var url = map.googleApiGeocodeUrl + address + "&key=" + map.googleMapsApiKey;

    //get data and location geotag(longitude & lagitude) from the api 
    $.get(url, function (data) {
      return map.assignPosition(data.results[0].geometry.location);
    });
  });

  $("#game").click(function() {
    map.takeScreenShot()
    $("#go").attr("href", "gameboard.html?screenshot=" + map.screenShot.url);
  });
});