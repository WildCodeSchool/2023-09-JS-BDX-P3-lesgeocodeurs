// Initialization for ES Users
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

export default function Contact() {
  const [contactForm, setContactForm] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  /*  const isDisabled =
    contactForm.name.trim() === "" ||
    contactForm.email.trim() === "" ||
    (contactForm.text.trim() === "" && contactForm.text.length < 1000); */
  return (
    // <div className="contact-container">
    //   <h1 className="contact">Nous Contacter</h1>
    //   <div id="form-main">
    //     <div id="form-div">
    //       <form className="form" id="form1">
    //         <p className="name">
    //           <input
    //             name="name"
    //             type="text"
    //             className="feedback-input"
    //             placeholder="Nom"
    //             id="name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </p>

    //         <p className="email">
    //           <input
    //             name="email"
    //             type="text"
    //             className=" feedback-input"
    //             id="email"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </p>

    //         <select className="feedback-input">
    //           <option value="Demande d'infos">Demande d'informations</option>
    //           <option value="Demande de partenariat">
    //             Demande de partenariat
    //           </option>
    //           <option value="Autres">Autres</option>
    //         </select>

    //         <p className="text">
    //           <textarea
    //             name="text"
    //             className=" feedback-input"
    //             id="comment"
    //             placeholder="Message"
    //             value={text}
    //             onChange={(e) => setText(e.target.value)}
    //           />
    //         </p>

    //         <div className="submit">
    //           <input onClick={onSubmit} value="Envoyer" id="button-blue" />
    //           <div className="ease" />
    //         </div>
    //       </form>
    <div className="login-form">
      <h1 className="contact">Nous Contacter</h1>
      <form>
        <MDBInput
          id="form4Example1"
          wrapperClass="mb-4"
          label="Nom"
          name="lastName"
          onChange={handleChange}
        />
        <MDBInput
          type="email"
          id="form4Example2"
          wrapperClass="mb-4"
          label="Email"
          name="email"
          onChange={handleChange}
        />
        <MDBInput
          maxlength="140"
          wrapperClass="mb-4"
          textarea
          id="contact-textarea"
          rows={4}
          label="Message"
          name="message"
          onChange={handleChange}
        />

        <MDBBtn
          onClick={onSubmit}
          value="Envoyer"
          type="submit"
          className="mb-4"
          block
        >
          Envoyer
        </MDBBtn>
        {/*   {isDisabled ? (
          <span>
            {contactForm.name.trim() === "" && (
              <p>Veuillez renseigner votre nom</p>
            )}
            {contactForm.email.trim() === "" && (
              <p>Veuillez renseigner votre email</p>
            )}
            {contactForm.text.trim() === "" && (
              <p>Veuillez écrir votre message</p>
            )}
          </span>
        ) : (
          <Link to="/"></Link>
        )} */}
      </form>
    </div>
  );
}
