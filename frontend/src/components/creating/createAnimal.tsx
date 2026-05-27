import { useState } from "react";
import styles from "./create.module.css"
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
    depthRange: "",
    diet: "",
    isSchooling: false,
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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

    await fetch("http://localhost:5000/api/v1/species/createAnimal", {
      method: "POST",
      body: formData,
    });
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
