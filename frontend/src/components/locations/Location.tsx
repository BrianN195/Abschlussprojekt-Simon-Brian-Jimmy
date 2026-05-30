import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { LocationDetail } from "../../types/Locations";
import { Link, useParams } from "react-router-dom";
import styles from "./Location.module.css";

export default function Location() {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const [location, setLocation] = useState<LocationDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/v1/resorts/${id}/animal`, {
      headers: {
        "Accept-Language": i18n.language,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
      });
  }, [id, i18n.language]);

  if (!location) return <p>Loading</p>;

  return (
    <main className={styles.locationPage}>
      <div className={styles.uprow}>
        <div className={styles.hardInfoContainer}>
          <div className={styles.nameContainer}>
            <h2 className={styles.title}>{location.name}</h2>

            <div className={styles.statContainer}>
              <div className={styles.stat}>
                <p>{t("location.depth")}</p>
                <p>{location.depth}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("location.latitude")}</p>
                <p>{location.latitude}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("location.longitude")}</p>
                <p>{location.longitude}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("location.region")}</p>
                <p>{location.region}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("location.locationType")}</p>
                <p>{location.type}</p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={location.imageUrl}
          alt={location.name}
          className={styles.bild}
        />

        <div className={styles.appearList}>
          <h6 className={styles.title}>{t("location.animalsHere")}</h6>

          <ul>
            {location.animals?.map((animal) => (
              <Link
                className={styles.link}
                to={`/animal/${animal.id}`}
                key={animal.id}
              >
                <li>{animal.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.downrow}>
        <section className={styles.about}>
          <h6 className={styles.aboutTitle}>{t("location.about")}</h6>

          <p style={{ whiteSpace: "pre-line" }} className={styles.aboutText}>
            {location.description}
          </p>
        </section>
      </div>
    </main>
  );
}