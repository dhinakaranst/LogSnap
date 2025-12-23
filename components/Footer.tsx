export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center text-sm text-gray-500 bg-white border-t">
      <p className="font-medium text-gray-700">LogSnap</p>

      <p className="mt-1">
        Centralized logging for modern developers.
      </p>

      <p className="mt-2">
        © {new Date().getFullYear()} LogSnap. All rights reserved.
      </p>
    </footer>
  );
}
