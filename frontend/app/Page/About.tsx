export default function About() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            About Us
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Building Digital Experiences That Matter
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            We help businesses create modern web experiences,
            streamline operations, and deliver better customer
            experiences through technology.
          </p>
        </div>

        {/* Who We Are */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              We are a team of designers, developers, and
              strategists focused on creating scalable digital
              solutions. From websites and dashboards to custom
              applications, we help companies transform ideas
              into successful products.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Our goal is simple: build products that are fast,
              beautiful, and easy to use.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Team"
              className="rounded-3xl object-cover h-[450px] w-full"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-8 text-center">
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="mt-2 text-gray-600">
              Projects Completed
            </p>
          </div>

          <div className="rounded-2xl border p-8 text-center">
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="mt-2 text-gray-600">
              Happy Clients
            </p>
          </div>

          <div className="rounded-2xl border p-8 text-center">
            <h3 className="text-4xl font-bold">5+</h3>
            <p className="mt-2 text-gray-600">
              Years Experience
            </p>
          </div>

          <div className="rounded-2xl border p-8 text-center">
            <h3 className="text-4xl font-bold">99%</h3>
            <p className="mt-2 text-gray-600">
              Client Satisfaction
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl border p-12 text-center">
          <h2 className="text-4xl font-bold">
            Ready to work with us?
          </h2>

          <p className="mt-4 text-gray-600">
            Let's build something amazing together.
          </p>

          <button className="mt-8 rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}