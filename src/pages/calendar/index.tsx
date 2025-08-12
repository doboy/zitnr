import { useEffect } from "react";
import { PARKS } from "zitnr-utils";
import Layout from "../../components/Layout";

const initMap = () => {
  // @ts-ignore
  const google = window.google;

  if (!google) {
    return;
  }

  // Example location list
  const locations = PARKS.filter((park => park.location)).map((park) => {
    return {
      name: park.name,
      lat: park.location?.latitude,
      lng: park.location?.longitude
    };
  });

  // Center map on first location
  const map = new google.maps.Map(document.getElementById("map"), {
    center: locations[0],
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  let infoWindow;

  // Add markers for each location
  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name
    });

    google.maps.event.addListener(marker, 'click', function () {
      if (infoWindow) {
        infoWindow.close();
      }

      infoWindow = new google.maps.InfoWindow({
        content: `<div><strong>Marker Info</strong></div><div>${loc.name}</div>`
      });

      infoWindow.open(map, marker);
    });

  });

  // Optional: Fit map bounds to all markers
  const bounds = new google.maps.LatLngBounds();
  locations.forEach(loc => bounds.extend(loc));
  map.fitBounds(bounds);
};

const CalendarPickerPage = () => {

  useEffect(() => {
    initMap();
  }, [typeof window != "undefined" && window.google]);

  return (
    <Layout title="Calendar Picker" selectedMenuItem="calendar">
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGCtWMIHcKiPbzj14IsAlWj7N8uCn9Wc"></script>

      <div className="ui container">
        <h2 className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="calendar alternate icon"></i>
          <div className="content">
            Park Picker
          </div>
        </h2>
        <p>Choose a park to view reservation schedule</p>
      </div>

      <div className="ui medium segment" id="map" style={{ height: "80vh", width: "50%" }}></div>
    </Layout>
  )

};

export default CalendarPickerPage;