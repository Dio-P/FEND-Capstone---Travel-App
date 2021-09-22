<script>
              let autocomplete;
              function initAutocomplete(){
                  autocomplete = new google.maps.places.Autocomplete(
                      document.getElementById("city"),
                      {
                          types:["establishment"],
                          componentRestrictions: {"country": ["AU"]},
                          fields: ["place_id", "geometry", "name"]
                      }
                  );
                  autocomplete.addListener("place_change", onPlaceChanged);
              }
              function onPlaceChanged(){
                  var place = autocomplete.getPlace();

                  if (!place.geometry) {
                      document.getElementById("city").placeholder = "Enter a place";
                  }else{
                      document.getElementById("details").innerHTML = place.name;
                  }
              }
          </script>
          <script 
          src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap" async defer>
        </script>