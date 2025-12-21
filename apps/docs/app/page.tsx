import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Spectre Documentation</h1>
      <p className="text-lg text-gray-400 mb-8">
        Documentation for the Spectre Chat Widget.
      </p>
      <Link
        href="/docs"
        className="px-6 py-3 bg-white text-black font-bold rounded-none hover:bg-gray-200 transition-colors"
      >
        Go to Docs
      </Link>
    </main>
  );
}
