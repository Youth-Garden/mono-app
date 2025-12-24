import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="flex justify-between items-start w-full relative z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          05 / Contact
        </span>
        <span className="text-xs text-green-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Available for Contracts
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 my-24 relative z-10">
        <a
          href="mailto:hoangquan.tran.work@gmail.com"
          className="group relative"
        >
          <h2 className="text-[8vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-none text-white group-hover:scale-[1.02] transition-all duration-500">
            Initiate <br />
            <span className="italic font-serif group-hover:tracking-wider transition-all duration-500">
              Collaboration
            </span>
          </h2>
          <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 absolute -top-4 -right-4 md:-top-8 md:-right-12 text-white/40 group-hover:text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
        </a>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-white/10 pt-12 gap-12 relative z-10">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
            Connect
          </span>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/Quantaphocpython"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/qu%C3%A2n-tr%E1%BA%A7n-714134398/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hoangquan.tran.work@gmail.com"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono"
            >
              Email
            </a>
          </div>
        </div>

        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
            Location
          </span>
          <p className="text-sm text-gray-400 mb-2">Ho Chi Minh City</p>
          <p className="text-sm text-gray-400">Vietnam</p>
          <p className="text-xs text-gray-600 font-mono mt-4">
            10.8231° N, 106.6297° E
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
              Status
            </span>
            <p className="text-sm text-gray-400">Open to opportunities</p>
            <p className="text-sm text-gray-400">Full-time / Freelance</p>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-xs text-gray-600">© 2024 Trần Hoàng Quân</p>
            <p className="text-xs text-gray-700 mt-1">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
