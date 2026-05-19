import { useState } from "react";

export default function CreateAnimal() {
  const [isSchooling, setIsSchooling] = useState<boolean>(false);
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
          name=""
          id=""
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Scientific Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="category"
          onChange={handleChange}
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="danger Level"
          onChange={handleChange}
        />
        {/* bild einfügen, wie? was zu beachten? */}
        <input
          type="number"
          name=""
          id=""
          placeholder="size"
          onChange={handleChange}
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="weight"
          onChange={handleChange}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="habitat"
          onChange={handleChange}
        />
        <input
          type="month"
          name=""
          id=""
          placeholder="best viewing month"
          onChange={handleChange}
        />
        <input
          name="depthRange"
          placeholder="Depth Range"
          onChange={handleChange}
        />
        <div>
          <p>Is Schooling?</p>
          <input
            type="radio"
            checked={isSchooling === true}
            onChange={() => setIsSchooling(true)}
          />

          <input
            type="radio"
            checked={isSchooling === false}
            onChange={() => setIsSchooling(false)}
          />
        </div>
        <button type="submit"></button>
      </form>
    </>
  );
}
