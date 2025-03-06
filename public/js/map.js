
                  var map = L.map('map').setView([28.6139, 77.2090], 15);
                  L.tileLayer("https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=y2JxIJZ4f3dL9ytOFM7A",{
                    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                  }).addTo(map);

                  L.Control.geocoder();