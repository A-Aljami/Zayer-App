"use client";
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import eventsData from "../historyEvents";
import FlyToMarker from "./FyToMarker";
import Filter from "./Filter";

export interface HistoricalEvent {
  id: number;
  title: string;
  description: string;
  position: [number, number];
  category: string;
}

const defaultPosition: [number, number] = [26.2285, 50.586];

const emptyStar = <i className="fa-regular fa-star"></i>;
const fullStar = (
  <i
    className="fa-solid fa-star"
    style={{
      color: "#fdc401",
    }}
  ></i>
);

function MapsApp() {
  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);
  const [favourites, setFavourites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favourites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [searchResults, setSearchResults] = useState(eventsData);
  const mapRef = useRef(null);

  // Handle search input and filter results
  const handleSearch = (query: string) => {
    if (query === "") {
      setSearchResults(eventsData);
    } else {
      const filteredResults = eventsData.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  // Handle event selected from Filter (search suggestions)
  const handleEventSelect = (event: HistoricalEvent) => {
    setActiveEvent(event); // Set the event as active when selected
  };

  // Toggle favourite function
  const toggleFavourite = (eventId: number) => {
    let updatedFavourites = favourites.filter((id) => id !== eventId);

    if (!favourites.includes(eventId)) {
      updatedFavourites = [eventId, ...updatedFavourites];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handleListItemClick = (eventId: number) => {
    const event = eventsData.find((event) => event.id === eventId);

    if (event) {
      setActiveEvent(event);
    }
  };

  const handleTitleClick = (event: HistoricalEvent) => {
    const map = mapRef.current?.leafletElement;
    if (map) {
      map.flyTo(event.position, 13);
      setTimeout(() => {
        L.popup({ closeButton: true })
          .setLatLng(event.position)
          .setContent(`<p>${event.title}</p>`)
          .openOn(map);
      }, 500);
    }
  };

  return (
    <div className="content">
      <div className="map-content flex flex-col gap-6 h-full">
        <Filter
          setSelectedCategory={setSelectedCategory}
          onSearch={handleSearch}
          eventsData={eventsData}
          onEventSelect={handleEventSelect} // Pass handleEventSelect to Filter
        />
        <MapContainer
          center={defaultPosition}
          zoom={13}
          className="map-container"
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {searchResults
            .filter(
              (event) =>
                !selectedCategory || event.category === selectedCategory
            )
            .map((event) => (
              <Marker
                key={event.id}
                position={event.position}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    setActiveEvent(event);
                  },
                }}
              />
            ))}

          {activeEvent && (
            <Popup position={activeEvent.position}>
              <div className="popup-inner">
                <h2 className="popup-inner__title">{activeEvent.title}</h2>
              </div>
              <p className="popup-inner__description">
                {activeEvent.description}
              </p>
              <button
                className="popup-inner__button"
                onClick={() => toggleFavourite(activeEvent.id)}
              >
                {favourites.includes(activeEvent.id) ? (
                  <span>{fullStar} Unfavourite</span>
                ) : (
                  <span>{emptyStar} Favourite</span>
                )}
              </button>
            </Popup>
          )}

          {activeEvent && (
            <FlyToMarker position={activeEvent.position} zoomLevel={15} />
          )}
        </MapContainer>
      </div>

      <div className="liked-events">
        <h2 className="liked-events__title">
          <i className="fa-solid fa-star"></i> Favourite Events
        </h2>
        <ul>
          {favourites
            .map((id) => eventsData.find((event) => event.id === id))
            .map((event) => (
              <li
                key={event?.id}
                className="liked-events__event"
                onClick={() => {
                  if (event) handleListItemClick(event.id);
                }}
              >
                <div className="liked-events__item">
                  <h3>{event?.title}</h3>
                  <button
                    className="unfavourite-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event propagation to list item click
                      if (event) toggleFavourite(event.id);
                    }}
                  >
                    {fullStar}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MapsApp;
