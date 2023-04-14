import React from "react";
import "./Card.css"

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg"></div>
      <img src={pokemon.sprites.front_default} alt="" />
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
              {/* 上記はpokemonオブジェクトの中のtypesに数種類あることがわかりそれをmap関数で順番にとってきている */}
              {/* まずtypesをtypeという引数に指定し、その後にtypesオブジェクトの下にあるtypeの中のnameをとっている */}
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ：{pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
