const MarkerCategory = {
  Logistics: {
    name: "Logistics",
    icon: null,
  },
  LastMile: {
    name: "Last Mile",
    icon: null,
  },
  Unavailable: {
    name: "Immobile locato",
    icon: null,
  },
  City: {
    name: "Città",
    icon: "location_city",
  },
  Road: {
    name: "Tangenziale",
    icon: "road",
  },
  HighRoad: {
    name: "Autostrada",
    icon: "high_road",
  },
  Car: {
    name: "Casello autostradale",
    icon: "car",
  },
  Railway: {
    name: "Stazione ferroviaria",
    icon: "railway",
  },
  Airport: {
    name: "Aeroporto",
    icon: "local_airport",
  },
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
      category: "Logistics",
      imageUrl: "./assets/csp.jpg",
      url: "https://www.google.com",
      title: "Castel San Pietro",
      address: "Castel San Pietro Terme, BO, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.20748084609425, 45.557005241095766],
      category: "LastMile",
      imageUrl: "./assets/brescia.jpg",
      url: "https://www.google.com",
      title: "Brescia",
      address: "Brescia, BS, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.32337522358069, 45.458929165211245],
      category: "Logistics",
      imageUrl: "./assets/montichiari.jpg",
      url: "https://www.google.com",
      title: "Montichiari",
      address: "Castenedolo, BS, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [10.42709859586792, 44.82709859586792],
      category: "Unavailable",
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Parma",
      address: "Paese, Provincia, IT",
    },
    {
      type: MarkerType.Hub,
      coords: [11.72709859586792, 44.82709859586792],
      category: "Unavailable",
      imageUrl: "./cover-image.jpg",
      url: "https://www.google.com",
      title: "Ferrara",
      address: "Paese, Provincia, IT",
    },
  ],
  montichiari: [
    {
      type: MarkerType.POI,
      coords: [10.3306, 45.4276],
      category: "Airport",
    },
    {
      type: MarkerType.POI,
      coords: [10.212783, 45.532408],
      category: "Railway",
    },
    {
      type: MarkerType.POI,
      coords: [10.322619, 45.483961],
      category: "Car",
    },
    {
      type: MarkerType.POI,
      coords: [10.2159, 45.46795],
      category: "Car",
    },
    {
      type: MarkerType.POI,
      coords: [10.318110430029018, 45.4756154472314],
      category: "Road",
    },
    {
      type: MarkerType.POI,
      coords: [10.05747507932085, 45.53775119009684],
      category: "HighRoad",
    },
    {
      type: MarkerType.Hub,
      coords: [10.32337522358069, 45.458929165211245],
      category: "Logistics",
      imageUrl: "./assets/montichiari.jpg",
      url: "https://www.google.com",
      title: "Montichiari",
      address: "Paese, Provincia, IT",
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
        return [[10.3337241, 45.4863428], 10.5];
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
            <h5>${MarkerCategory[pin.category].name}</h5>
            <h4>${pin.title}</h4>
            <p>${pin.address}</p>
            ${
              pin.category !== "Unavailable"
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
        const markerElement = document.createElement("div");

        markerElement.classList.add("marker", "icon");
        markerElement.style.backgroundImage = `url(./assets/icon_${
          MarkerCategory[pin.category].icon
        }.svg)`;

        new mapboxgl.Marker(markerElement).setLngLat(pin.coords).addTo(map);
        return;
      }
      default:
        return;
    }
  });

  const legendContainer = document.getElementById("legend");
  const legendSidebar = document.getElementById("legend-sidebar");

  legendContainer &&
    Object.entries(MarkerCategory).forEach(([categoryName, category]) => {
      if (!pins[key].find((pin) => pin.category === categoryName)) {
        return;
      }

      const color = getCategoryColor(categoryName);
      const legendItemContainer = document.createElement("li");
      const legendItemMarker = document.createElement("span");
      const legendItemLabel = document.createElement("span");

      legendItemMarker.classList.add("marker", color);
      legendItemLabel.innerText = category.name;

      if (category.icon) {
        legendItemMarker.style.backgroundImage = `url(./assets/icon_${category.icon}.svg)`;
      }

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

function getCategoryColor(categoryName) {
  switch (categoryName) {
    case "Logistics":
      return "green";
    case "LastMile":
      return "white";
    case "Unavailable":
      return "black";
    case "City":
    case "Road":
    case "Car":
    case "Railway":
    case "Airport":
      return "icon";
  }
}
