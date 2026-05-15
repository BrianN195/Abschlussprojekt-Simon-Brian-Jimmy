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
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {(results.animals.length > 0 || results.locations.length > 0) && (
        <div>
          {results.animals.length > 0 && (
            <ul>
              {results.animals.map((animal) => (
                <li key={animal.id}>
                  <Link to={`/animal/${animal.id}`}>{animal.name}</Link>
                </li>
              ))}
            </ul>
          )}

          {results.locations.length > 0 && (
            <ul>
              {results.locations.map((loc) => (
                <li key={loc.id}>
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
