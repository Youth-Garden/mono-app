import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-400 mb-8">{t('description')}</p>
      <Link
        href="/docs"
        className="px-6 py-3 bg-white text-black font-bold rounded-none hover:bg-gray-200 transition-colors"
      >
        {t('cta')}
      </Link>
    </main>
  );
}
