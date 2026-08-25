"use client";

import { useRef, useState } from "react";
import { useEnv } from "./EnvProvider";

/**
 * Contact form, ported from the inline <script> on the old contact page.
 *
 * Submits with fetch so the visitor stays on the page and sees an inline
 * status message, rather than being redirected to the form provider's own
 * confirmation page.
 *
 * The endpoint comes from CONTACT_FORM_ENDPOINT in .env. Until that is set to
 * a real form ID the form is disabled and points visitors at the email link
 * instead of silently swallowing their message.
 */
export function ContactForm() {
  const { contactFormEndpoint, contactFormConfigured, supportEmail } = useEnv();
  const formRef = useRef(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(null); // { text, kind }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!contactFormConfigured) return;

    setPending(true);
    setStatus(null);
    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        body: new FormData(formRef.current),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus({
          text: "Thanks - your message is on its way. We'll get back to you soon.",
          kind: "success",
        });
        formRef.current.reset();
      } else {
        setStatus({
          text: "Something went wrong sending that. Please try the email link instead.",
          kind: "error",
        });
      }
    } catch {
      setStatus({
        text: "Something went wrong sending that. Please try the email link instead.",
        kind: "error",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      id="contact-form"
      className="contact-form"
      action={contactFormEndpoint}
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="contact-name">Name</label>
        <input type="text" id="contact-name" name="name" placeholder="Your name" required />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input type="email" id="contact-email" name="email" placeholder="you@example.com" required />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="What's on your mind?" required />
      </div>

      {/* Honeypot anti-spam field - leave this alone */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-hp">Leave this field empty</label>
        <input type="text" id="contact-hp" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_subject" value="New message from Mindhack.in contact form" />

      <button type="submit" className="contact-submit-btn" disabled={pending || !contactFormConfigured}>
        <i className="fas fa-paper-plane" /> {pending ? "Sending..." : "Send Message"}
      </button>

      <div
        id="contact-form-status"
        className={"contact-form-status" + (status ? " " + status.kind : "")}
      >
        {status?.text || ""}
      </div>

      {contactFormConfigured ? (
        <p className="contact-form-note">
          We read every message and try to reply within a few days.
        </p>
      ) : (
        <p className="contact-form-note">
          This form isn&apos;t connected yet — please email us at{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a> and we&apos;ll get right back to you.
        </p>
      )}
    </form>
  );
}
