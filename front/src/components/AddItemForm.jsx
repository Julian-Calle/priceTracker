import React from "react";
import "../CSS/addItemForm.css";

export default function AddItemForm() {
  return (
    <form className="addItemForm">
      <div>
        <label className="formLabel" htmlFor="url">
          URL :{" "}
        </label>
        <input type="text" id="url" placeholder="copia el link" />
      </div>
      <div>
        <label className="formLabel" htmlFor="email">
          email:{" "}
        </label>
        <input type="text" id="email" placeholder="copia el email acá" />
      </div>
      <button className="formButton"> AÑADIR</button>
    </form>
  );
}
