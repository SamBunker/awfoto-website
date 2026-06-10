import '../styles/Contact.css';

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <p className="section-subtitle">Get in Touch</p>
        <h2 className="section-title">Let’s Work Together</h2>
        <p className="contact-text">
          Booking sessions and available for events. Reach out and let’s talk
          about your project.
        </p>
        <a href="mailto:hello@awfoto.com" className="btn">hello@awfoto.com</a>
      </div>
    </section>
  );
}

export default Contact;
