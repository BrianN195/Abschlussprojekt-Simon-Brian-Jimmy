import { useState } from "react";

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
    <>
      <form onSubmit={handleCreate}>
        <h2>Create Animal</h2>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="scientificName"
          id=""
          placeholder="Scientific Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          id=""
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          id=""
          placeholder="category"
          onChange={handleChange}
        />
        <input
          type="number"
          name="dangerLevel"
          id=""
          placeholder="danger Level"
          onChange={handleChange}
        />
        <input
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
          type="text"
          name="size"
          id=""
          placeholder="size"
          onChange={handleChange}
        />
        <input
          type="text"
          name="weight"
          id=""
          placeholder="weight"
          onChange={handleChange}
        />
        <input
          type="text"
          name="habitat"
          id=""
          placeholder="habitat"
          onChange={handleChange}
        />
        <input
          type="month"
          name="bestViewingTime"
          id=""
          placeholder="best viewing month"
          onChange={handleChange}
        />
        <input
          name="depthRange"
          placeholder="Depth Range"
          onChange={handleChange}
        />
        <input
          type="text"
          name="diet"
          placeholder="Diet"
          onChange={handleChange}
        />
        <div>
          <p>Is Schooling?</p>

          <label>
            Yes
            <input
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

          <label>
            No
            <input
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
        <button type="submit">Create Animal</button>
      </form>
    </>
  );
}
