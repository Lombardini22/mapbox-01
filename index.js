window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZnVkZmFjdG9yeSIsImEiOiJja3plM2VhcnowZTB0MnVvY25ucTFmZ2tlIn0.pAyQhvDwW-cWBmJHvUe-tQ";

  const pins = [
    createPin(
      44.42633415796408,
      11.612585832942786,
      '<a href="https://www.google.com" target="_blank" rel="nofollow">CSP</a>',
      "green"
    ),
    createPin(
      45.557005241095766,
      10.20748084609425,
      '<a href="https://www.google.com" target="_blank" rel="nofollow">Brescia</a>',
      "green"
    ),
    createPin(
      45.458929165211245,
      10.32337522358069,
      '<a href="https://www.google.com" target="_blank" rel="nofollow">Montichiari</a>',
      "red"
    ),
    createPin(
      45.527078,
      10.929078,
      '<a href="https://www.google.com" target="_blank" rel="nofollow">Verona</a>',
      "image"
    ),
  ];

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/fudfactory/ckzwq6gcb000a15pjo7aiuuvk",
    center: [12.978, 44.231],
    zoom: 6.19,
  });

  pins.forEach((pin) => {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(pin.description);
    const el = document.createElement("div");

    el.classList.add("marker", pin.color);

    new mapboxgl.Marker(el).setLngLat(pin.coords).setPopup(popup).addTo(map);
  });
});

/**
 * @param {number} lat
 * @param {number} lon
 * @param {string} description
 * @param {string} color
 */
function createPin(lat, lon, description, color) {
  return { coords: [lon, lat], description, color };
}
