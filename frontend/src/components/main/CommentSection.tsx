import { useTranslation } from 'react-i18next';

function CommentSection() {
    const { t } = useTranslation();
    return (
        <section className="comment-section">
            <h2>{t('comments.title')}</h2>

            <p>{t('comments.subtitle')}

            </p>
        </section>
    );
}

export default CommentSection;
