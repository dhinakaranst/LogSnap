export default function WhyLogSnap() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why LogSnap?
      </h2>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Save Debugging Time</h3>
          <p className="text-gray-600 text-sm">
            Stop searching through scattered logs. LogSnap brings everything
            into one place.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Built for Developers</h3>
          <p className="text-gray-600 text-sm">
            Simple APIs, clean UI, and a developer-first experience from day one.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Clarity Over Noise</h3>
          <p className="text-gray-600 text-sm">
            Focus on meaningful logs and errors without unnecessary clutter.
          </p>
        </div>
      </div>
    </section>
  );
}
