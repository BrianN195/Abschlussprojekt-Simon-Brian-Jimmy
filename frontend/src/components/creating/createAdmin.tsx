import { useState } from "react";
import styles from "./createAdmin.module.css"
export default function MakeAdmin() {
  const [email, setEmail] = useState("");

  const handleMakeAdmin = async () => {
    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:5000/api/v1/auth/make-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className={styles.adminContainer}>
  <h2 className={styles.adminTitle}>Make Admin</h2>

  <input
    className={styles.adminInput}
    type="email"
    placeholder="User email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <button className={styles.adminButton} onClick={handleMakeAdmin}>
    Promote to Admin
  </button>
</div>
  );
}