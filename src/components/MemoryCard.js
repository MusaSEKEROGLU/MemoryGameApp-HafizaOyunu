import React from "react";
import "./MemoryCard.css";

const MemoryCard = ({ card, handleSelected, disabled, rotated }) => {
  const handleClick = () => {
    if (!disabled) {
      //seçim izni
      handleSelected(card);
    }
  };

  return (
    <div>
      <div className="card">
        <div className={rotated ? "rotated" : ""}>
          {/* kartların ön ve arka yüzü */}
          <img className="cardFront" src={card.path} alt="" />
          <img
            className="cardBack"
            onClick={handleClick}
            src="/img/cover.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
