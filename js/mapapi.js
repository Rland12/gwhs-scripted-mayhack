function googleMapWrapper(imageId) {
  this.imageId = imageId;

  this.googleMapsApiKey = 'AIzaSyCwLY1vDNFqYUY7eSj4kTVwiuW1-XZC55U';
  this.googleApiGeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  this.googleMapDisplay = document.getElementById('pano')
  
  this.position;
  this.screenShot = {
    height: '640',
    width: '400',

    shots: [],
    url: '',
    
    location: '',
    heading: '',
    pitch: '',
    fov: '',
  }
  this.panorama;
  
  this.assignPosition = function(position) {
    this.position = position;
    return this.renderGoogleMap();
  }

  this.renderGoogleMap = function() {
    var googleMapScriptTag = document.createElement('script');
    googleMapScriptTag.type = 'text/javascript';
    googleMapScriptTag.async = true;
    googleMapScriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapsApiKey +'&callback=map.initialize';
    
    return document.getElementsByTagName('body')[0].appendChild(googleMapScriptTag);
  }

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

  this.getNew

  this.takeScreenShot = function() {
    this.screenShot.url = "https://maps.googleapis.com/maps/api/streetview?size=" + this.screenShot.height + "x" + this.screenShot.height + "&location=" + this.screenShot.location + "&fov=" + this.screenShot.fov + "&heading=" + this.screenShot.heading + "&pitch=" + this.screenShot.pitch + "&key=" + this.googleMapsApiKey;
    this.screenShot.shots.push(this.screenShot.url)
    
    if (this.screenShot.shots.length > 1) {
      if (this.screenShot.url === this.screenShot.shots.slice(-2)[0]) console.log('same')
    }
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