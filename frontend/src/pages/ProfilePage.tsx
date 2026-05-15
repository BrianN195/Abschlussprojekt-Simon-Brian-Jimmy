import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ProfileSection from "../components/main/ProfileSection";
import { authService, type AuthUser } from "../services/authService";
import "../styles/profile.css";

function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    gender: "",
    birthDate: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function syncForm(nextUser: AuthUser | null) {
    setFormData({
      username: nextUser?.username || "",
      bio: (nextUser?.bio as string) || "",
      gender: (nextUser?.gender as string) || "",
      birthDate: nextUser?.birthDate || "",
    });
    setAvatarFile(null);
    setAvatarPreview((nextUser?.profileImage as string) || "");
  }

  useEffect(() => {
    const local = authService.getUser();
    if (local) {
      setUser(local);
      syncForm(local);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const profile = await authService.fetchProfile();
        setUser(profile);
        syncForm(profile);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setAvatarFile(file);

    if (file) {
      const nextPreview = URL.createObjectURL(file);
      setAvatarPreview(nextPreview);
      return;
    }

    setAvatarPreview((user?.profileImage as string) || "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("bio", formData.bio);
      payload.append("gender", formData.gender);
      payload.append("birthDate", formData.birthDate);

      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      const updated = await authService.updateProfile(payload);

      setUser(updated);
      syncForm(updated);
      setAvatarPreview((updated.profileImage as string) || "");
      setSuccess("Profil gespeichert.");
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="profile-page">
      <h1 className="main-title">Profile</h1>
      {loading && <p>Loading profile…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "#b8f7d2" }}>{success}</p>}

      {!loading && !error && <ProfileSection user={user} />}

      {!loading && !error && (
        <section className="profile-edit-section">
          <h2 className="section-title">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="profile-edit-grid">
              <div className="profile-avatar-panel">
                <div className="profile-avatar-large">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                <div>
                  <p className="profile-helper-text">PNG, JPG oder WEBP bis 5 MB.</p>
                  <label htmlFor="avatar" className="file-button">
                    Avatar auswählen
                  </label>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </div>
              </div>

              <div className="profile-form-fields">
                <div>
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    className="form-input"
                  />
                </div>

                <div className="profile-form-row">
                  <div>
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Not set</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="others">others</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="birthDate" className="form-label">Birth date</label>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <button type="submit" className="app-button profile-save-button" disabled={saving}>
                  {saving ? "Saving…" : "Save profile"}
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default ProfilePage;
