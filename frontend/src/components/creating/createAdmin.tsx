import { useState } from "react";

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
    <div>
      <h2>Make Admin</h2>

      <input
        type="email"
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleMakeAdmin}>
        Promote to Admin
      </button>
    </div>
  );
}