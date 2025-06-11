import { BASE_URL } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const AddressAutocomplete = ({
  placeholder = "Enter an address...",
  onPlaceSelected,
  debounceTime = 300,
  apiEndpoint = "/api/autocomplete", // Default endpoint for your backend proxy
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null); // Ref for the suggestions list to detect clicks outside

  // Effect to handle debounced API calls to your backend
  useEffect(() => {
    // Clear any previous debounce timeout to ensure only the latest query is processed
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // If the query is empty, clear suggestions, loading state, and errors
    if (query.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true); // Set loading state while waiting for suggestions
    setError(null); // Clear any previous errors

    // Set a new debounce timeout
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        // Send request to your own backend API endpoint
        // This assumes your backend expects a POST request with a JSON body containing the 'query'
        // Default endpoint for your backend proxy
        const response = await fetch(`${BASE_URL}/autocomplete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }), // Send the user's input query to your server
        });

        // Check if the response from your backend was successful
        if (!response.ok) {
          // If not successful, throw an error with the status
          throw new Error(`Backend API error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response from your backend

        // Assuming your backend returns data in a similar structure to OpenCage's 'results' array
        if (data && Array.isArray(data) && data.length > 0) {
          setSuggestions(data); // Update suggestions with data from your backend
        } else {
          setSuggestions([]); // No results found
        }
      } catch (e) {
        // Catch and log any errors during the fetch operation
        console.error(
          "Error fetching autocomplete suggestions from backend:",
          e
        );
        setError("No result Found");
        setSuggestions([]); // Clear suggestions on error
      } finally {
        setLoading(false); // Always set loading to false after the fetch operation
      }
    }, debounceTime); // The delay before sending the request

    // Cleanup function: clear the timeout if the component unmounts or query changes before timeout
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, debounceTime, apiEndpoint]); // Dependencies for this effect

  // Effect to handle clicks outside the component to close the suggestions list
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the input and outside the suggestions list
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]); // Close suggestions
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Handler for input field changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handler for when a suggestion is selected from the list
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.formatted); // Update the input field with the selected formatted address
    setSuggestions([]); // Clear the suggestions list
    if (onPlaceSelected) {
      onPlaceSelected(suggestion); // Call the parent's callback with the full suggestion object
    }
  };

  return (
    <div className="relative ">
      {/* Input field for typing the address */}

      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        // className="w-full px-3 py-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
        className="max-w-lg border-gray-500"
        aria-label={placeholder}
      />
      {/* Loading indicator */}
      {loading && (
        <div className="absolute z-10 w-full max-w-lg bg-white border border-gray-300 rounded-b-lg shadow-lg mt-1 p-2 text-center text-gray-600">
          Loading suggestions...
        </div>
      )}

      {/* Error message display */}
      {error && (
        <div className="absolute z-10 w-full max-w-lg bg-white border border-gray-300 text-gray-600 rounded-b-lg shadow-lg mt-1 p-2">
          {error}
        </div>
      )}

      {/* Suggestions list, only shown if there are suggestions and not loading */}
      {suggestions.length > 0 && !loading && (
        <ul
          ref={suggestionsRef}
          className="absolute z-10 w-full max-w-lg bg-white border border-gray-300 rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
        >
          {suggestions.map((place, index) => (
            <li
              // Using geohash + index for a unique key, as geohash might not be unique enough alone
              key={place.place_id}
              onClick={() => handleSelectSuggestion(place)}
              className="p-3 cursor-pointer hover:bg-blue-100 border-b border-gray-200 last:border-b-0 "
              aria-label={`Select ${place.formatted}`}
            >
              🗺️ {place.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default AddressAutocomplete;
