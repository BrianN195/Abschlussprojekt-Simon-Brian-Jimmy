import { useState } from "react";
import styles from "./create.module.css"

const API_BASE_URL = "/api/v1";

export default function CreateLocation() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    region: "",
    latitude: 0,
    longitude: 0,
    depth: 0,
    type: "reef",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude" || name === "depth"
          ? Number(value)
          : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });

    await fetch(`${API_BASE_URL}/species/createLocation`, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreate}>
        <h2 className={styles.title}>Create Location</h2>

        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="text"
          name="region"
          placeholder="Region"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="number"
          step="0.0001"
          name="latitude"
          placeholder="Latitude"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="number"
          step="0.0001"
          name="longitude"
          placeholder="Longitude"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="number"
          name="depth"
          placeholder="Depth"
          onChange={handleChange}
        />

        <select className="glass-dropdown" name="type" onChange={handleChange}>
          <option value="reef">Reef</option>
          <option value="wreck">Wreck</option>
          <option value="cave">Cave</option>
          <option value="wall">Wall</option>
          <option value="sandbank">Sandbank</option>
        </select>

        <input
          className={styles.fileInput}
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setForm((prev) => ({
                ...prev,
                image: e.target.files![0],
              }));
            }
          }}
        />

        <button className={styles.button} type="submit">
          Create Location
        </button>
      </form>
    </div>
  );
}
