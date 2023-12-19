import React, { useState, ChangeEvent, FormEvent } from "react";
import "./formEarrings.css";

interface EarringFormData {
  earringName: string;
  earringDescription: string;
  responsibleName: string;
}

export const FormEarringsCreate: React.FC = () => {
  const [earringData, setEarringData] = useState<EarringFormData>({
    earringName: "",
    earringDescription: "",
    responsibleName: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEarringData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del pendiente a través de una función de API o realizar otras acciones necesarias
    console.log("Earring Data:", earringData);
    // Reiniciar el formulario después de enviar
    setEarringData({
      earringName: "",
      earringDescription: "",
      responsibleName: "",
    });
  };

  return (
    <section className="container">
      <div className="row">
        <h3 className="center-align">Crear Pendiente</h3>
        <article className="col s6 offset-s3">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">subject</i>
              <label htmlFor="earringName">Nombre del Pendiente</label>
              <input
                type="text"
                id="earringName"
                name="earringName"
                value={earringData.earringName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-field">
              <i className="material-icons prefix">description</i>
              <label htmlFor="earringDescription">
                Descripción del Pendiente
              </label>

              <input
                type="text"
                id="earringDescription"
                name="earringDescription"
                value={earringData.earringDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="material-icons prefix">person</i>
              <label htmlFor="responsibleName">Nombre del Responsable</label>
              <input
                type="text"
                id="responsibleName"
                name="responsibleName"
                value={earringData.responsibleName}
                onChange={handleInputChange}
                required
              />
            </div>

            <p className="center-align">
              <button className="waves-effect waves-light btn" type="submit">
                <i className="material-icons right">send</i>Crear Pendiente
              </button>
            </p>
          </form>
        </article>
      </div>
    </section>
  );
};
