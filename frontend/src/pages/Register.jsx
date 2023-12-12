import { useState } from "react";

export default function Register() {
  const [userRegister, setUserRegister] = useState({});
  const handleInput = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // postUser();
  };
  return (
    <div className="register-container">
      <form className="register" action="" onSubmit={handleSubmit}>
        <label className="" htmlFor="enter">
          S'inscire
        </label>
        <div className="inputs">
          <label htmlFor="email" action="">
            Email
          </label>
          <input
            className=""
            type="text"
            name="email"
            // id="name"
            onChange={handleInput}
          />

          <input
            className="input"
            type="text"
            name="title"
            placeholder="Entrer un titre"
            onChange={handleInput}
          />
          <input
            className="input"
            type="url"
            name="url"
            placeholder="URL"
            onChange={handleInput}
          />
        </div>
        <textarea
          className="input-actuality"
          type="text"
          name="content"
          placeholder=""
          onChange={handleInput}
        />

        <input type="submit" className="edit" value="Suivant" />
      </form>
      {/* {userRegister?.map((el) => (
        <div>{el.email}</div>
      ))} */}
    </div>
  );
}
