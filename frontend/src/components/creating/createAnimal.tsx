import { useState } from "react";
import styles from "./create.module.css";

const API_BASE_URL = "/api/v1";
export default function CreateAnimal() {
  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    description: "",
    category: "",
    dangerLevel: 1,
    size: "",
    weight: "",
    habitat: "",
    bestViewingTime: "",
    depthRange: "",
    diet: "",
    isSchooling: false,
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMIT");
    const formData = new FormData();

    // Alles explizit setzen
    formData.append("name", form.name);
    formData.append("scientificName", form.scientificName);
    formData.append("description", form.description);
    formData.append("category", form.category);

    formData.append("dangerLevel", String(form.dangerLevel));

    formData.append("size", form.size);
    formData.append("weight", form.weight);
    formData.append("habitat", form.habitat);
    if (form.bestViewingTime) {
      formData.append("bestViewingTime", form.bestViewingTime);
    }

    formData.append("depthRange", form.depthRange);
    formData.append("diet", form.diet);

    formData.append("isSchooling", String(form.isSchooling));

    if (form.image) {
      formData.append("image", form.image);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/species/createAnimal`,
        {
          method: "POST",
          body: formData,
        },
      );

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("RESPONSE:", data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreate}>
        <h2 className={styles.title}>Create Animal</h2>

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
          name="scientificName"
          placeholder="Scientific Name"
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
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="number"
          name="dangerLevel"
          placeholder="Danger Level"
          onChange={handleChange}
        />

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

        <input
          className={styles.input}
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="text"
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="text"
          name="habitat"
          placeholder="Habitat"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="month"
          name="bestViewingTime"
          placeholder="Best Viewing Month"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="depthRange"
          placeholder="Depth Range"
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="text"
          name="diet"
          placeholder="Diet"
          onChange={handleChange}
        />

        <div className={styles.radioWrapper}>
          <p className={styles.radioTitle}>Is Schooling?</p>

          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              Yes
              <input
                className={styles.radioInput}
                type="radio"
                name="isSchooling"
                checked={form.isSchooling === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    isSchooling: true,
                  }))
                }
              />
            </label>

            <label className={styles.radioLabel}>
              No
              <input
                className={styles.radioInput}
                type="radio"
                name="isSchooling"
                checked={form.isSchooling === false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    isSchooling: false,
                  }))
                }
              />
            </label>
          </div>
        </div>

        <button className={styles.button} type="submit">
          Create Animal
        </button>
      </form>
    </div>
  );
}
