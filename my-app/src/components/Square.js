import React from "react";

const Square = ({ value, onClick }) => {
  const imageUrl = value === "X" ? "https://cmu-313.github.io/assets/images/hilton.jpg" : "https://cmu-313.github.io/assets/images/hyrum.jpg";

  return (
    <button className="square" onClick={onClick}>
      <img src={imageUrl} alt={value} />
    </button>
  );
};

export default Square;