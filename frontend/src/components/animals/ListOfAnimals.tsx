import { useEffect, useState } from "react";
import { speciesService } from "../../services/animalService";
import type { Animal } from "../../types/Animal";

export default function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        setLoading(true);

        const data = await speciesService.getAll();
        setAnimals(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  if (loading) return <p>Lade Tiere...</p>;

  return (
    <div className="grid gap-3">
      {animals.length === 0 ? (
        <p>Keine Tiere gespeichert</p>
      ) : (
        animals.map((animal) => (
          <div key={animal.id} className="p-3 rounded-xl shadow bg-white">
            <h3 className="text-lg font-bold">{animal.name}</h3>
            <p className="text-sm text-gray-500">{animal.category}</p>
          </div>
        ))
      )}
    </div>
  );
}
