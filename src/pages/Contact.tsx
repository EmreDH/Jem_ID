import React from "react";
import { Helmet } from "react-helmet";

function Contact() {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      
      <Helmet>
        <title>Jem.ID | Contact</title>
        <meta
          name="description"
          content="Neem contact op met Jem.ID via e-mail voor meer informatie over onze digitale oplossingen."
        />
      </Helmet>

      
      <h1 tabIndex={0}>Contact</h1>

      
      <p id="contact-description">
        Heb je vragen of wil je meer informatie? Stuur ons gerust een e-mail:
      </p>

     
      <a
        href="mailto:info@jem.id"
        aria-label="Stuur een e-mail naar info@jem.id"
        style={{
          color: "#007BFF",
          textDecoration: "underline",
        }}
      >
        info@jem.id
      </a>
    </div>
  );
}

export default Contact;
