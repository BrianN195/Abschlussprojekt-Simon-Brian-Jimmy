import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const avatarUrl = user?.profileImage || null;
    const genderLabel = user?.gender
        ? t(`profile.${user.gender}` as "profile.male")
        : t('profile.notSet');

    return (
        <section className="profile-section profile-summary-card">
            <div className="profile-summary-header">
                <div className="profile-avatar-shell" aria-label={t('profile.avatarLabel')}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={t('profile.avatarAlt', { name: user?.username || t('auth.guest') })} />
                    ) : (
                        <span className="profile-avatar-fallback">{getInitials(user?.username)}</span>
                    )}
                </div>

                <div className="profile-summary-copy">
                    <p className="section-kicker">{t('profile.account')}</p>
                    <h2 className="section-title">{user?.username || 'Guest'}</h2>
                    <p className="profile-bio">{user ? user.email : t('profile.accessRestricted')}</p>
                </div>
            </div>

            {user && (
                <div className="profile-stats">
                    <div>
                        <span className="profile-stat-label">{t('profile.gender')}</span>
                        <strong>{genderLabel}</strong>
                    </div>

                    <div>
                        <span className="profile-stat-label">{t('profile.birthDate')}</span>
                        <strong>{user.birthDate || t('profile.notSet')}</strong>
                    </div>

                    <div className="profile-stat-wide">
                        <span className="profile-stat-label">{t('profile.bio')}</span>
                        <strong>{user.bio || t('profile.noBio')}</strong>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProfileSection;
