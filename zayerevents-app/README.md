
# Bahrain Tourist Events Map

Zayer is an interactive map application for tourists visiting Bahrain. It helps users discover key events and attractions around the country, displaying them on a map with detailed information about each event or location. The user can search for events, view recommendations, and mark their favorite locations for easy access.

## Features
- Interactive map using **Leaflet** and **React-Leaflet**.
- Search functionality to find events or attractions.
- Ability to favorite locations, which are then displayed in a "Favourite Events" section.
- Toggle between light and dark themes for better user experience.
- Information popups for events/places, providing descriptions and the ability to add them to the favorites list.

## Installation

Before running the application, make sure you have **Node.js** installed.

1. Clone the repository:
    ```bash
    git clone https://github.com/A-Aljami/Zayer-App.git
    cd bahrain-tourist-map
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

    You will need to install the following specific packages:

    - **Sass** for styling:
        ```bash
        npm i sass
        ```

    - **React-Leaflet** and **Leaflet** for the map functionality:
        ```bash
        npm i react-leaflet leaflet
        ```

    - **@types/leaflet** for Leaflet type definitions (if you're using TypeScript):
        ```bash
        npm i --save-dev @types/leaflet
        ```

## Running the Application

To start the development server, make sure you're in the correct project directory and run:

```bash
npm run dev
```

This will start the development server, and you can view the application by visiting `http://localhost:3000` in your browser.

## Project Structure

- **Components**: React components such as the `Filter` for searching events, `FlyToMarker` for map interactions, and `MapsApp` for rendering the main map interface.
- **Styles**: SCSS files to style the components and overall app layout.
- **Events Data**: Contains data about events and places to visit in Bahrain, displayed on the map.

## Key Technologies

- **React.js**: For building the user interface.
- **Leaflet & React-Leaflet**: For rendering the map and managing map interactions.
- **Sass**: For styling and managing themes.
- **TypeScript** (if applicable): Type definitions for better development experience and type safety.

## About the Application

The app is designed to assist tourists visiting Bahrain by providing an easy-to-use map that displays key locations and events. Users can search for specific locations, mark their favorite spots, and get detailed information about the various events happening in the country. The app features a toggle between light and dark themes for accessibility and user preference.
