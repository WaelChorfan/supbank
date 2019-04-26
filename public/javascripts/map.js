



function load() {
setTimeout(() => {
  
  var locations = window.locs;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(0,0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][2], locations[i][3]),
      map: map
    });
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent("Balance:"+locations[i][0] + "$" + "\n" + "Address:" + locations[i][1]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }


}, 500);



  //----------


  var xmlhttp = new XMLHttpRequest();
  var newLocations=[];
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = JSON.parse(this.responseText);
      users.forEach(user => {
        for (let i = 0; i < user.location.length; i++) {
          newLocations.push(
            [user.balance ? user.balance : 0,
              user.publicKey,
            user.location[i].ll[0],
            user.location[i].ll[1]
            ])
        }
      });
    }

   window.locs=newLocations;

  };
  xmlhttp.open("GET", "http://localhost:5000/api/usersLocations", true);
  xmlhttp.send();



}






