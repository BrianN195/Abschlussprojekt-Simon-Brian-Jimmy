import { useEffect, useState } from "react";
import type { Animal } from "../../types/Animal";
import type { Location } from "../../types/Locations";
import { Link } from "react-router-dom";

type SearchResults = {
  animals: Animal[];
  locations: Location[];
};

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResults>({
    animals: [],
    locations: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        setResults({
          animals: [],
          locations: [],
        });
        return;
      }

      try {
        const res = await fetch(
          `/api/v1/search/search?search=${encodeURIComponent(search)}`,
        );

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="search-bar" role="search">
      <input
        className="search-input"
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search"
        autoComplete="off"
      />

      {(results.animals.length > 0 || results.locations.length > 0) && (
        <div className="search-results" role="listbox">
          {results.animals.length > 0 && (
            <ul className="search-group" aria-label="Animal results">
              {results.animals.map((animal) => (
                <li key={animal.id} className="search-item" role="option">
                  <Link to={`/animal/${animal.id}`}>{animal.name}</Link>
                </li>
              ))}
            </ul>
          )}

          {results.locations.length > 0 && (
            <ul className="search-group" aria-label="Location results">
              {results.locations.map((loc) => (
                <li key={loc.id} className="search-item" role="option">
                  <Link to={`/location/${loc.id}`}>{loc.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
