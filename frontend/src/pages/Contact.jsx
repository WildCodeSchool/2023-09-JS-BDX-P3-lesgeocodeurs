// Initialization for ES Users
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const onSubmit = () => {
    alert(`Envoyé ${name} ${email} ${text}`);
  };

  return (
    <div className="contact-container">
      <h1 className="contact">Nous Contacter</h1>
      <div id="form-main">
        <div id="form-div">
          <form className="form" id="form1">
            <p className="name">
              <input
                name="name"
                type="text"
                className="feedback-input"
                placeholder="Nom"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>

            <p className="email">
              <input
                name="email"
                type="text"
                className=" feedback-input"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <select className="feedback-input">
              <option value="Demande d'infos">Demande d'informations</option>
              <option value="Demande de partenariat">
                Demande de partenariat
              </option>
              <option value="Autres">Autres</option>
            </select>

            <p className="text">
              <textarea
                name="text"
                className=" feedback-input"
                id="comment"
                placeholder="Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </p>

            <div className="submit">
              <input onClick={onSubmit} value="Envoyer" id="button-blue" />
              <div className="ease" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
