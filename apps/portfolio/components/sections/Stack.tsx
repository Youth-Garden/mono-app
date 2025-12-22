export default function Stack() {
  return (
    <section className="border-b border-white/10 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Header */}
        <div className="md:col-span-3 border-r border-white/10 p-6 md:p-12">
          <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            02 / Arsenal
          </h2>
          <h3 className="text-3xl font-bold uppercase tracking-tight">
            Tech
            <br />
            Stack
          </h3>
        </div>

        {/* Grid content */}
        <div className="md:col-span-9">
          {/* Table Header - Hidden on mobile, visible on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10 text-xs text-[#666] uppercase tracking-widest font-mono hidden md:grid">
            <div className="p-4 border-r border-white/10">Domain</div>
            <div className="p-4 col-span-3">Technologies</div>
          </div>

          {/* Rows */}
          {[
            { domain: 'CORE', tech: 'TypeScript, Rust, Solidity, Move' },
            {
              domain: 'FRONTEND',
              tech: 'Next.js 15, React, Svelte, GSAP, WebGL',
            },
            {
              domain: 'BACKEND',
              tech: 'NestJS, Fastify, PostgreSQL, Prisma, Redis',
            },
            {
              domain: 'DEVOPS',
              tech: 'Docker, Turborepo, Vercel, CI/CD Pipelines',
            },
            { domain: 'WEB3', tech: 'Hardhat, Viem, Aptos SDK, IPFS' },
          ].map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors group"
            >
              <div className="p-6 md:p-8 border-r border-white/10 font-mono text-sm text-[#888] group-hover:text-white transition-colors">
                {row.domain}
              </div>
              <div className="p-6 md:p-8 col-span-3 text-lg md:text-xl font-light tracking-wide">
                {row.tech}
              </div>
            </div>
          ))}

          {/* Action Bar */}
          <div className="p-4 flex justify-end md:border-t border-white/10">
            <button className="text-xs uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">
              Export to Sheets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
