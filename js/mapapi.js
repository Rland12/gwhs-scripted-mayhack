var fenway;
var panorama;
$(document).ready(function(){
  searchAddress();
});

function searchAddress(){
  $("form").submit(function(e){
    e.preventDefault();
    var address= $("#place").val();
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyCwLY1vDNFqYUY7eSj4kTVwiuW1-XZC55U";
console.log("submitted",address,url);
    
    
$.get( url, function( data ) {
 console.log(data.results[0].formatted_address,data.results[0].geometry.location);
    fenway = data.results[0].geometry.location;
  addMap();
}); 
});
}

function addMap(){
  var map = document.createElement('script');
     map.type = 'text/javascript';
     map.async = true;
     map.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwLY1vDNFqYUY7eSj4kTVwiuW1-XZC55U&callback=initialize';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(map);
}
  

 function initialize() {
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway
         
});


   $("#game").click(function()
{ 
  var locations = window.panorama.position.lat()
+","+window.panorama.position.lng()
;
  var zoomed = window.panorama.pov.zoom;
  var k = Math.pow(0.5051, zoomed);
  var fov = 103.7587 * k;
  var headings = window.panorama.pov.heading;
  var pitchs = window.panorama.pov.pitch;
  var url= "https://maps.googleapis.com/maps/api/streetview?size=640x400&location="+locations+"&fov="+fov+"&heading="+headings+"&pitch="+pitchs+"&key=AIzaSyCwLY1vDNFqYUY7eSj4kTVwiuW1-XZC55U";
  console.log(locations,fov, headings,pitchs,url);
    $("#img").attr("src",url);
    $("#go").attr("href","gameboard.html?location="+ url);

  
});  

}
