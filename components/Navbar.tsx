import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-100 py-8">
        
        {/* LEFT: LOGO / APP NAME */}
        <Link href="/" className="text-xl font-bold text-black">
          LogSnap
        </Link>

        {/* RIGHT: NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium text-black-600">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="#features" className="hover:text-black transition">
            Features
          </Link>
          <Link href="about" className="hover:text-black transition">
            About Us
          </Link>
          <Link href="#contact" className="hover:text-black transition">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

