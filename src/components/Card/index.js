import React, { useState } from "react";
import styles from "./Card.module.scss";

function Card({ id, imageUrl, title, price, onPlus, onChecked }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    if (isAdded) {
      onChecked(id);
    } else {
      onPlus({ id, imageUrl, title, price });
    }
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className={styles.plus}>
          <img
            onClick={onClickPlus}
            src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
            alt="Plus"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
