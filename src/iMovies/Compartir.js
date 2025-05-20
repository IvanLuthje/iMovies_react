import React, { useState } from 'react';

const Compartir = () => {
  const [emailReceptor, setEmailReceptor] = useState('');
  const [subject, setSubject] = useState('');
  const [comentario, setComentario] = useState('');
  const [alerta, setAlerta] = useState('');

  const cancelar = () => {
    window.location.href = "index.html";
  };

  const reset = () => {
    setEmailReceptor('');
    setSubject('');
    setComentario('');
    setAlerta('');
  };

  const enviar = () => {
    const alertCorreo = (
      <span><i className="fas fa-exclamation-triangle"></i> Debe ingresar el correo electrónico</span>
    );
    const alertRedirect = (
      <span><i className="fa fa-external-link" aria-hidden="true"></i> Redireccionando al gestor de correo</span>
    );

    if (emailReceptor.trim() === '') {
      setAlerta(alertCorreo);
      return;
    }

    const regexCorreo = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;

    if (!regexCorreo.test(emailReceptor)) {
      setAlerta("Debe ingresar un correo electrónico válido");
      return;
    }

    setAlerta(alertRedirect);

    window.location.href = `mailto:${emailReceptor}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(comentario)}`;
  };

  return (
    <div>
      <form id="formulario_compartir" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={emailReceptor}
            onChange={(e) => setEmailReceptor(e.target.value)}
            id="email_receptor"
          />
        </div>
        <div>
          <label>Asunto:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="subject"
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            id="comentario"
          ></textarea>
        </div>
        <div className="alert">{alerta}</div>
        <div>
          <button className="enviar" type="button" onClick={enviar}><i class='fa fa-paper-plane' aria-hidden='true'></i></button>
          <button className="reset" type="button" onClick={reset}><i class="fa fa-refresh" aria-hidden="true"></i></button>
          <button className="cancel" type="button" onClick={cancelar}><i class="fa fa-window-close" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  );
};

export default Compartir;
