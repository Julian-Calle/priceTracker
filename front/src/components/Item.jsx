import React from "react";
// import "../CSS/item.css";

export default function Item() {
  return (
    <div className="singleItem">
      <img src="https://source.unsplash.com/random/600x400" alt="item" />
      <div className="itemInformation">
        <h1> nombre del item</h1>
        <h3>Precio actual: 400$</h3>
      </div>
    </div>
  );
}
