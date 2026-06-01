import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from "react";
import type { Animal } from "../../types/Animal";
import type { Location } from "../../types/Locations";
import { Link } from "react-router-dom";

type SearchResults = {
  animals: Animal[];
  locations: Location[];
};

export default function SearchBar() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResults>({
    animals: [],
    locations: [],
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

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
          `/api/v1/search?search=${encodeURIComponent(search)}`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          },
        );

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [search, i18n.language]);

  return (
    <div className="search-bar" role="search">
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        value={search}
        placeholder={t('search.placeholder')}
        onChange={(e) => setSearch(e.target.value)}
        aria-label={t('search.ariaLabel')}
        autoComplete="off"
      />

      {(results.animals.length > 0 || results.locations.length > 0) && (
        <div className="search-results" role="listbox">
          {results.animals.length > 0 && (
            <ul className="search-group" aria-label={t('search.animalsResults')}>
              {results.animals.map((animal) => (
                <li key={animal.id} className="search-item" role="option">
                  <Link
                    to={`/animal/${animal.id}`}
                    onClick={() => {
                      setResults({ animals: [], locations: [] });
                      setSearch("");
                      inputRef.current?.blur();
                    }}
                  >
                    {animal.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.locations.length > 0 && (
            <ul className="search-group" aria-label={t('search.locationsResults')}>
              {results.locations.map((loc) => (
                <li key={loc.id} className="search-item" role="option">
                  <Link
                    to={`/location/${loc.id}`}
                    onClick={() => {
                      setResults({ animals: [], locations: [] });
                      setSearch("");
                      inputRef.current?.blur();
                    }}
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
