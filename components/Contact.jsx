import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold">Contact</h2>
      <p className="mt-2 text-muted">Use the form below or reach me on social.</p>
      <form
        action="https://formspree.io/f/your-id"
        method="POST"
        className="mt-6 grid gap-4 sm:max-w-xl"
        onSubmit={() => setStatus({ state: "submitting", message: "" })}
      >
        <label className="grid gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            required
            className="rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-600"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            required
            className="rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-600"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Message</span>
          <textarea
            name="message"
            rows="5"
            required
            className="rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-600"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-brand-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-70"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? "Sending…" : "Send"}
        </button>
      </form>
      <div className="mt-4 text-sm text-muted">
        <p>Replace the Formspree action with your endpoint when ready.</p>
      </div>
    </section>
  );
}

