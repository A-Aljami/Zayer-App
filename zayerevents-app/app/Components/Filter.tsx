import React, { useState, useEffect } from "react";
import "../styles/_filter.scss";
import { HistoricalEvent } from "./MapsApp"; // Import the correct event type

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  onSearch: (query: string) => void;
  eventsData: HistoricalEvent[]; // Pass the full event data
  onEventSelect: (event: HistoricalEvent) => void; // Function to handle event selection
}

function Filter({
  setSelectedCategory,
  onSearch,
  eventsData,
  onEventSelect,
}: Props) {
  const categories = [
    "History",
    "Religion",
    "Sports",
    "Nature",
    "Modern Architecture",
    "Shopping",
    "Recreation",
  ];

  const [theme, setTheme] = useState("dark-theme");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<HistoricalEvent[]>([]); // Store full event objects

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchQuery(input);
    onSearch(input);

    if (input.length >= 3 && eventsData.length > 0) {
      const filteredSuggestions = eventsData.filter((event) =>
        event.title.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (event: HistoricalEvent) => {
    setSearchQuery(event.title);
    onSearch(event.title); // Trigger the search with the selected suggestion
    onEventSelect(event); // Pass the full event object to the parent component
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="filter-container">
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for a title..."
        className="search-bar"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && searchQuery.length >= 3 && (
        <ul className="filter__suggestions-list">
          {suggestions.map((event, index) => (
            <li
              key={index}
              className="filter__suggestion-item"
              onClick={() => handleSuggestionClick(event)}
            >
              {event.title}
            </li>
          ))}
        </ul>
      )}

      {/* Category Filter */}
      <div className="filter__select">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggler">
        <input
          type="checkbox"
          id="theme-toggler__checkbox"
          className="theme-toggler__checkbox"
        />
        <label
          htmlFor="theme-toggler__checkbox"
          className="theme-toggler__label"
          onClick={changeTheme}
        >
          Toggle
        </label>
      </div>
    </div>
  );
}

export default Filter;
