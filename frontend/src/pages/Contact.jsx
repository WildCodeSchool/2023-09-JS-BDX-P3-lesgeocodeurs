// Initialization for ES Users

export default function Contact() {
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
              />
            </p>

            <p className="email">
              <input
                name="email"
                type="text"
                className=" feedback-input"
                id="email"
                placeholder="Email"
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
              />
            </p>

            <div className="submit">
              <input type="submit" value="Envoyer" id="button-blue" />
              <div className="ease" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
