 export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[hsl(292,27%,36%)] text-white rounded-md flex items-center justify-center font-bold">
            P
          </div>
          <span className="font-heading text-xl text-[hsl(292,27%,36%)]">
            PeerHive
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-10 text-sm font-medium">

          <a
            href="/features"
            className="hover:text-[hsl(292,27%,36%)] transition"
          >
            Features
          </a>

          <a
            href="/how-it-works"
            className="hover:text-[hsl(292,27%,36%)] transition"
          >
            How It Works
          </a>

          <a
            href="/login"
            className="hover:text-[hsl(292,27%,36%)] transition"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-5 py-2 bg-[hsl(292,27%,36%)] text-white rounded-lg hover:shadow-md transition"
          >
            Get Started
          </a>

        </nav>
      </div>
    </header>
  );
}