import React from 'react';

import { MagicCard } from '../../types';

import BlankScroll from '../../blank-scroll.svg';

import './Card.scss';

const Card: React.FC<MagicCard & { releaseDate: string }> = ({ name, setName, imageUrl = '', rarity, type, releaseDate }) => (
  <article className="card">
    <header className="card__header">
      <p className="card__setname">{setName}</p> - <p className="card__name">{name}</p>
    </header>

    <img src={imageUrl || BlankScroll} alt={`${name} image`} className="card__image" loading="lazy" />  

    <footer className="card__footer">
      <div className="card__footer--row">
        <p className="card__release-date">Release Date:</p>
        <p>{releaseDate}</p>
      </div>

      <div className="card__footer--row">
        <p className="card__rarity">Rarity: </p>
        <p>{rarity}</p>
      </div>

      <div className="card__footer--row">
        <p className="card__types">Type:</p>
        <p>{type}</p>
      </div>
    </footer>
  </article>
);

export default Card;
