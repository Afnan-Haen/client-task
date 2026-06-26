export default function Contact() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact Us
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Let's Start a Conversation
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Have a project in mind? We'd love to hear from you.
            Send us a message and we'll get back to you shortly.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border p-8">
              <h2 className="text-2xl font-bold">
                Contact Information
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">
                    hello@example.com
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border p-8">
              <h3 className="text-xl font-bold">
                Business Hours
              </h3>

              <div className="mt-4 text-gray-600 space-y-2">
                <p>Monday - Friday: 9 AM - 6 PM</p>
                <p>Saturday: 10 AM - 4 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="rounded-3xl border p-8 space-y-6">
            <div>
              <label className="mb-2 block font-medium">
                Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Subject
              </label>

              <input
                type="text"
                placeholder="Project Inquiry"
                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black py-4 text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}