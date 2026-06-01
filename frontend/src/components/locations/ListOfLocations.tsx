import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import type { Location } from "../../types/Locations";
import { locationService } from "../../services/locationService";

export default function locationList() {
  const { i18n, t } = useTranslation();
  const [locations, setlocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchlocations() {
      try {
        setLoading(true);

        const data = await locationService.getAll(i18n.language);
        setlocations(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchlocations();
  }, [i18n.language]);

  if (loading) return <p>{t('list.loadingLocations')}</p>;

  return (
    <div className="grid gap-3">
      {locations.length === 0 ? (
        <p>{t('list.noLocations')}</p>
      ) : (
        locations.map((location) => (
          <div key={location.id} className="p-3 rounded-xl shadow bg-white">
            <h3 className="text-lg font-bold">{location.name}</h3>
            <p className="text-sm text-gray-500">{location.region}</p>
          </div>
        ))
      )}
    </div>
  );
}