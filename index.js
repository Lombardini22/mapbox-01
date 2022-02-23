const pins = [
  {
    coords: [11.612585832942786, 44.42633415796408],
    color: "green",
    imageUrl: "./cover-image.jpg",
    url: "https://www.google.com",
    title: "CSP",
    address: "Via Lorem Ipsum, 42, 12345 Paese (PV), IT",
  },
  {
    coords: [10.20748084609425, 45.557005241095766],
    color: "green",
    imageUrl: "./cover-image.jpg",
    url: "https://www.google.com",
    title: "Brescia",
    address: "Via Lorem Ipsum, 42, 12345 Paese (PV), IT",
  },
  {
    coords: [10.32337522358069, 45.458929165211245],
    color: "white",
    imageUrl: "./cover-image.jpg",
    url: "https://www.google.com",
    title: "Montichiari",
    address: "Via Lorem Ipsum, 42, 12345 Paese (PV), IT",
  },
  {
    coords: [10.42709859586792, 44.82709859586792],
    color: "black",
    imageUrl: "./cover-image.jpg",
    url: "https://www.google.com",
    title: "Parma",
    address: "Via Lorem Ipsum, 42, 12345 Paese (PV), IT",
  },
  {
    coords: [11.72709859586792, 44.82709859586792],
    color: "black",
    imageUrl: "./cover-image.jpg",
    url: "https://www.google.com",
    title: "Ferrara",
    address: "Via Lorem Ipsum, 42, 12345 Paese (PV), IT",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZnVkZmFjdG9yeSIsImEiOiJja3plM2VhcnowZTB0MnVvY25ucTFmZ2tlIn0.pAyQhvDwW-cWBmJHvUe-tQ";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/fudfactory/ckzwq6gcb000a15pjo7aiuuvk",
    center: [12.978, 44.231],
    zoom: 6.19,
  });

  pins.forEach((pin) => {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <img
        class="l22-custom-popup-content-image"
        src="${pin.imageUrl}"
        alt="${pin.title}"
      >
      <div class="l22-custom-popup-content">
        <h4>${pin.title}</h4>
        <p>${pin.address}</p>
        <a href="${pin.url}" target="_blank" rel="noopen">Scopri di più</a>
      </div>
    `);

    const el = document.createElement("div");
    el.classList.add("marker", pin.color);

    new mapboxgl.Marker(el).setLngLat(pin.coords).setPopup(popup).addTo(map);
  });
});
