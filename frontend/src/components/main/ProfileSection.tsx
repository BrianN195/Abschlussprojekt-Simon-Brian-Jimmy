import type { AuthUser } from "../../services/authService";
import "../../styles/profile.css";

type Props = {
    user?: AuthUser | null;
};

function getInitials(name?: string) {
    if (!name) {
        return "G";
    }

    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function ProfileSection({ user }: Props) {
    const avatarUrl = user?.profileImage || null;

    return (
        <section className="profile-section profile-summary-card">
            <div className="profile-summary-header">
                <div className="profile-avatar-shell" aria-label="Profile avatar">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={`${user?.username || "Guest"} avatar`} />
                    ) : (
                        <span className="profile-avatar-fallback">{getInitials(user?.username)}</span>
                    )}
                </div>

                <div className="profile-summary-copy">
                    <p className="section-kicker">Account</p>
                    <h2 className="section-title">{user?.username || 'Guest'}</h2>
                    <p className="profile-bio">{user ? user.email : 'Access restricted (403)'}</p>
                </div>
            </div>

            {user && (
                <div className="profile-stats">
                    <div>
                        <span className="profile-stat-label">Gender</span>
                        <strong>{user.gender || 'Not set'}</strong>
                    </div>

                    <div>
                        <span className="profile-stat-label">Birth date</span>
                        <strong>{user.birthDate || 'Not set'}</strong>
                    </div>

                    <div className="profile-stat-wide">
                        <span className="profile-stat-label">Bio</span>
                        <strong>{user.bio || 'No bio yet'}</strong>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProfileSection;
