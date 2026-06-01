import { useState } from "react";
import styles from "./connectAnimalLocation.module.css"

const API_BASE_URL = "/api/v1";
export default function ConnectAnimalLocation() {
  const [animalName, setAnimalName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [rarity, setRarity] = useState("common");

  const searchLocation = async () => {
    const res = await fetch(
      `${API_BASE_URL}/connect/search-location/${locationName}`,
    );

    const data = await res.json();

    setLocationId(data.id);
  };

  const searchAnimal = async () => {
    const res = await fetch(
      `${API_BASE_URL}/connect/search-animal/${animalName}`,
    );

    const data = await res.json();

    setAnimalId(data.id);
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/connect/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalId,
        locationId,
        rarity,
      }),
    });
  };

  return (
  <div className={styles.container}>
  <div className={styles.card}>
    <h2 className={styles.title}>
      Connect Animal & Location
    </h2>

    <div className={styles.topRow}>
      {/* Animal Search */}
      <div className={styles.searchBox}>
        <h3 className={styles.searchTitle}>
          Animal Search
        </h3>

        <input
          className={styles.input}
          type="text"
          placeholder="Animal Name"
          value={animalName}
          onChange={(e) =>
            setAnimalName(e.target.value)
          }
        />

        <button
          className={styles.searchButton}
          onClick={searchAnimal}
        >
          Search Animal
        </button>

        {animalId && (
          <p className={styles.foundText}>
            Animal found with ID: {animalId}
          </p>
        )}
      </div>

      {/* Location Search */}
      <div className={styles.searchBox}>
        <h3 className={styles.searchTitle}>
          Location Search
        </h3>

        <input
          className={styles.input}
          type="text"
          placeholder="Location Name"
          value={locationName}
          onChange={(e) =>
            setLocationName(e.target.value)
          }
        />

        <button
          className={styles.searchButton}
          onClick={searchLocation}
        >
          Search Location
        </button>

        {locationId && (
          <p className={styles.foundText}>
            Location found with ID: {locationId}
          </p>
        )}
      </div>
    </div>

    {/* Rarity */}
    <div className={styles.middleSection}>
      <div className={styles.rarityBox}>
        <label>Rarity</label>

        <select
          className={styles.select}
          value={rarity}
          onChange={(e) =>
            setRarity(e.target.value)
          }
        >
          <option value="common">
            Common
          </option>

          <option value="rare">
            Rare
          </option>

          <option value="legendary">
            Legendary
          </option>
        </select>
      </div>
    </div>

    {/* Connect */}
    <div className={styles.bottomSection}>
      <button
        className={styles.connectButton}
        onClick={handleConnect}
        disabled={!animalId || !locationId}
      >
        Connect
      </button>
    </div>
  </div>
</div>
);
}
