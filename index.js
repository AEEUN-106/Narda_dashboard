var json;

window.initMap = function () {

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.8294374, lng: 128.5655119 },
      zoom: 12
    });

    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();

    const requestURL = 'http://speelow.ivyro.net/position.php/';

    const xhr = new XMLHttpRequest();
    //setInterval(function() {
      xhr.open('GET', requestURL);
    xhr.onload = () => {
      json = JSON.parse(xhr.response)['userData'];
      json.forEach(element => {

        var lat = Number(element.latitude);
        var lng = Number(element.longitude);

        const marker = new google.maps.Marker({
          position: { lat, lng },
          label : {text: element.userId, color: "white"},
          icon: "bicycle2.png",
          map
        });
        bounds.extend(marker.position);
    
        marker.addListener("click", () => {
          map.panTo(marker.position);
          // infoWindow.setContent(element.userId);
          // infoWindow.open({
          //   anchor: marker,
          //   map
          // });
        });

      });
      //map.fitBounds(bounds);

    };
    xhr.send();
  //}, 1000);
  };
  