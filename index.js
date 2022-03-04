const MarkerCategory = {
  Logistics: "Logistics",
  LastMile: "Last Mile",
  Unavailable: "Non disponibile",
};

const MarkerType = {
  Hub: "Warehouse",
  POI: "POI",
};

const pins = {
  default: [
    {
      type: MarkerType.Hub,
      coords: [11.612585832942786, 44.42633415796408],
      category: MarkerCategory.Logistics,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "CSP",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.20748084609425, 45.557005241095766],
      category: MarkerCategory.Logistics,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Brescia",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.32337522358069, 45.458929165211245],
      category: MarkerCategory.LastMile,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Montichiari",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.42709859586792, 44.82709859586792],
      category: MarkerCategory.Unavailable,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Parma",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [11.72709859586792, 44.82709859586792],
      category: MarkerCategory.Unavailable,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Ferrara",
      address: "Paese, Provincia, IT",
    },
  ],
  montichiari: [
    {
      type: MarkerType.Hub,
      coords: [10.32337522358069, 45.458929165211245],
      category: MarkerCategory.LastMile,
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Montichiari",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.POI,
      coords: [10.3247483, 45.4256264],
      title: "Aeroporto Brescia-Montichiari",
      icon: "local_airport",
    },
    {
      type: MarkerType.POI,
      coords: [10.2106313, 45.5323787],
      title: "Stazione ferroviaria di Brescia",
      icon: "railway",
    },
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZnVkZmFjdG9yeSIsImEiOiJja3plM2VhcnowZTB0MnVvY25ucTFmZ2tlIn0.pAyQhvDwW-cWBmJHvUe-tQ";

  const key = (() => {
    const url = new URL(window.location.href);
    const key = url.searchParams.get("key");

    switch (key) {
      case "montichiari":
        return key;
      default:
        return "default";
    }
  })();

  const [mapCenter, mapZoom] = (() => {
    switch (key) {
      case "montichiari":
        return [[10.3337241, 45.4863428], 10];
      default:
        return [[12.978, 44.231], 6.19];
    }
  })();

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/fudfactory/ckzwq6gcb000a15pjo7aiuuvk",
    center: mapCenter,
    zoom: mapZoom,
  });

  pins[key].forEach((pin) => {
    switch (pin.type) {
      case MarkerType.Hub: {
        const color = getCategoryColor(pin.category);
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <img
            class="l22-custom-popup-content-image"
            src="${pin.imageUrl}"
            alt="${pin.title}"
          >
          <div class="l22-custom-popup-content ${color}">
            <h5>${pin.category}</h5>
            <h4>${pin.title}</h4>
            <p>${pin.address}</p>
            ${
              pin.category !== MarkerCategory.Unavailable
                ? `<a href="${pin.url}" target="_blank" rel="noopen">Scopri di più</a>`
                : ""
            }
          </div>
        `);

        const markerElement = document.createElement("div");

        markerElement.classList.add("marker", color);

        new mapboxgl.Marker(markerElement)
          .setLngLat(pin.coords)
          .setPopup(popup)
          .addTo(map);

        return;
      }
      case MarkerType.POI: {
        const markerContainer = document.createElement("div");
        const markerElement = document.createElement("span");
        const markerLabel = document.createElement("span");

        markerContainer.classList.add("marker-icon");
        markerElement.style.backgroundImage = `url(./assets/icon_${pin.icon}.svg)`;
        markerLabel.innerHTML = pin.title;

        markerContainer.appendChild(markerElement);
        markerContainer.appendChild(markerLabel);

        new mapboxgl.Marker(markerContainer).setLngLat(pin.coords).addTo(map);

        return;
      }
      default:
        return;
    }
  });

  const legendContainer = document.getElementById("legend");
  const legendSidebar = document.getElementById("legend-sidebar");

  legendContainer &&
    Object.values(MarkerCategory).forEach((category) => {
      const color = getCategoryColor(category);
      const legendItemContainer = document.createElement("li");
      const legendItemMarker = document.createElement("span");
      const legendItemLabel = document.createElement("span");

      legendItemMarker.classList.add("marker", color);
      legendItemLabel.innerText = category;

      legendItemContainer.appendChild(legendItemMarker);
      legendItemContainer.appendChild(legendItemLabel);
      legendContainer.appendChild(legendItemContainer);
    });

  const openLegendButton = document.getElementById("open-legend");
  const closeLegendButton = document.getElementById("close-legend");

  legendSidebar &&
    openLegendButton &&
    openLegendButton.addEventListener("click", () =>
      legendSidebar.classList.add("open")
    );

  legendSidebar &&
    closeLegendButton &&
    closeLegendButton.addEventListener("click", () =>
      legendSidebar.classList.remove("open")
    );
});

function getCategoryColor(category) {
  switch (category) {
    case MarkerCategory.Logistics:
      return "green";
    case MarkerCategory.LastMile:
      return "white";
    case MarkerCategory.Unavailable:
      return "black";
  }
}
