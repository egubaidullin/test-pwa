// Initialize map
const map = L.map('map').setView([0, 0], 2); // Default view

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Get user's location
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    map.setView([latitude, longitude], 13);
     reverseGeocode(latitude, longitude);
    fetchEmergencyServices(latitude, longitude);
}, () => {
     console.log("Could not obtain location");
});

// Reverse geocode the users location
async function reverseGeocode(latitude, longitude) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      if(data.display_name){
         document.getElementById('address').textContent = `Your address is: ${data.display_name}`;
      } else {
          document.getElementById('address').textContent = `Could not determine your address`;
      }

    } catch (error) {
      console.error("Error fetching address:", error);
        document.getElementById('address').textContent = `Could not determine your address`;
    }
}

// Fetch emergency services from the Cloudflare Worker
async function fetchEmergencyServices(latitude, longitude) {
    try {
        const response = await fetch(`/api/worker?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        data.forEach(service => {
           L.marker([service.latitude, service.longitude])
               .bindPopup(`<b>${service.name}</b><br>${service.address}<br>Phone: ${service.phone}<br>Type: ${service.service_type}`)
               .addTo(map);
        });
    } catch (error) {
        console.error("Error fetching emergency services:", error);
    }
}


// Search functionality
document.getElementById('search-button').addEventListener('click', async () => {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`);
          const data = await response.json();
           if (data && data.length > 0) {
               const firstResult = data[0];
               map.setView([firstResult.lat, firstResult.lon], 13);
               reverseGeocode(firstResult.lat, firstResult.lon);
               fetchEmergencyServices(firstResult.lat, firstResult.lon);
           } else {
             alert("Location not found");
           }
      } catch (error){
        console.error("Error searching location:", error);
      }
    }
});
