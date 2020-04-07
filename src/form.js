import React, { useState } from "react";

const Form = ({ handleSubmit }) => {
  const [username, setUser] = useState("williamf.brtz@gmail.com");
  const [password, setPass] = useState("smells");

  return (
    <>
      <div className="field">
        <label htmlFor="username">E-mail</label>
        <input
          type="text"
          className="text-field"
          id="username"
          name="username"
          placeholder="E-mail"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          className="text-field"
          id="password"
          name="password"
          placeholder="E-mail"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="field">
        <button
          className="btn-submit"
          type="submit"
          onClick={() => handleSubmit(username, password)}
        >
          Entrar
        </button>
      </div>
    </>
  );
};

export default Form;
