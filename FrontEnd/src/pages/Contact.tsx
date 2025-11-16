import React from "react";
import "../styling/Contact.css";

function Contact() {
  return (
    <div className="contact-container">

      {/* Main heading */}
      <h1 className="contact-title">Heb je een vraag, opmerking of klacht?</h1>

      <p className="contact-subtitle">
        We verbeteren onze service voortdurend en horen graag hoe we jou beter kunnen helpen.
      </p>

      {/* 3-column section */}
      <section className="contact-grid" aria-label="Categorieën voor vragen en feedback">

        {/* ---- Question ---- */}
        <article className="contact-card" aria-labelledby="vraag-title">
          <h2 id="vraag-title" className="contact-card-title">
            <span className="contact-icon" role="img" aria-label="Vraag icoon">💬</span>{" "}
            Vraag
          </h2>

          <ul className="contact-list">
            <li>Betaling</li>
            <li>Account</li>
            <li>Registratie</li>
            <li>Verzending</li>
            <li>Productinformatie</li>
            <li>Overig</li>
          </ul>
        </article>

        {/* ---- Comment ---- */}
        <article className="contact-card" aria-labelledby="opmerking-title">
          <h2 id="opmerking-title" className="contact-card-title">
            <span className="contact-icon" role="img" aria-label="Opmerking icoon">📣</span>{" "}
            Opmerking
          </h2>

          <ul className="contact-list">
            <li>Website</li>
            <li>Gebruiksvriendelijkheid</li>
            <li>Mobiele app</li>
            <li>Overig</li>
          </ul>
        </article>

        {/* ---- Complaint ---- */}
        <article className="contact-card" aria-labelledby="klacht-title">
          <h2 id="klacht-title" className="contact-card-title">
            <span className="contact-icon" role="img" aria-label="Klacht icoon">📄</span>{" "}
            Klacht
          </h2>

          <ul className="contact-list">
            <li>Product</li>
            <li>Website</li>
            <li>Overig</li>
          </ul>
        </article>

      </section>

      {/* Contact information */}
      <section className="contact-footer" aria-label="Contactinformatie">
        <h2>Contact opnemen</h2>
        <p>
          Stuur ons een e-mail op{" "}
          <a
            href="mailto:info@jem.id"
            className="contact-email"
            aria-label="Stuur een email naar info@jem.id"
          >
            info@jem.id
          </a>
        </p>
      </section>

    </div>
  );
}

export default Contact;
