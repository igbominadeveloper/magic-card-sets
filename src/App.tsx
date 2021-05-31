import React, { useEffect, useState } from 'react';

import Card from './components/Card/Card';
import Loader from './components/Loader/Loader';

import './App.scss';

import { MagicSet, MagicCard, SelectedMagicSet } from './types';

import { getSets, getCards } from './services';

function App() {
  const [magicSets, setMagicSets] = useState<Array<MagicSet>>([]);

  const [magicCards, setMagicCards] = useState<Array<MagicCard>>([]);

  const [selectedMagicSet, setSelectedMagicSet] = useState<SelectedMagicSet>({ code: '', name: '', releaseDate: '' });

  const [currentPage, setCurrentPage] = useState(1);

  const [totalItems, setTotalItems] = useState(0);

  const [fetchingCards, setFetchingCards] = useState(false);

  const totalPages = () => Math.round(totalItems / 12);

  const handleMagicSetSelection = (magicSetCode: string) => {
    const activeMagicSet = magicSets.find((magicSet: MagicSet) => magicSet.code === magicSetCode);

    if (!activeMagicSet) return;

    setSelectedMagicSet({
      code: activeMagicSet.code,
      name: activeMagicSet.name,
      releaseDate: activeMagicSet.releaseDate,
    });
  };

  const fetchSets = () => {
    try {
      getSets()
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((response: { sets: Array<MagicSet> }) => {
          const fetchedSets = response.sets;
          setMagicSets(fetchedSets);
          const { code, name, releaseDate } = fetchedSets[0];

          const defaultMagicSet: SelectedMagicSet = {
            code,
            name,
            releaseDate,
          };
          // we are setting the default selected set to the first one
          setSelectedMagicSet(defaultMagicSet);
          localStorage.setItem('sets', JSON.stringify(fetchedSets));
        });
    } catch (error) {
      // set the
    }
  };

  const fetchCards = () => {
    try {
      setFetchingCards(true);

      getCards(selectedMagicSet.code, currentPage)
        .then((response) => {
          if (response.ok) {
            setTotalItems(Number(response.headers.get('total-count')));

            return response.json();
          }
        })
        .then((response: { cards: Array<MagicCard> }) => {
          setMagicCards(response.cards);
          localStorage.setItem('cards', JSON.stringify(response.cards));
          setFetchingCards(false);
        });
    } catch (error) {
      setFetchingCards(false);
      // set the
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      fetchCards();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages()) {
      setCurrentPage(currentPage + 1);
      fetchCards();
    }
  };

  const goToFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      fetchCards();
    }
  };

  const goToLastPage = () => {
    if (currentPage !== totalPages()) {
      setCurrentPage(totalPages);
      fetchCards();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetchCards();
  };

  useEffect(() => {
    fetchSets();
  }, []);

  return (
    <div className="App">
      <p className="App__header" data-testid="header">
        Select a set from the options here
      </p>

      <form className="App__form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <select
          data-testid="select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleMagicSetSelection(event.target.value)}
        >
          {magicSets.map((set: MagicSet) => (
            <option value={set.code} key={set.code}>
              {set.name}
            </option>
          ))}
        </select>

        <button disabled={fetchingCards} type="submit" data-testid="fetch-button">
          {fetchingCards ? 'Loading...' : 'Gather'}
        </button>
      </form>

      <section className="App__cards" data-testid="app-cards">
        {fetchingCards ? (
          <div className="App__loader-container">
            <Loader className="App__loader" data-testid="page-loader" />
            <p data-testid="page-loader-text">Loading cards...</p>
          </div>
        ) : magicCards.length === 0 ? (
          <div className="App__loader-container">
            <img
              src="https://res.cloudinary.com/igbominadeveloper/image/upload/v1622460554/empty-cards_q1wxcw.png"
              alt="No Cards"
              className="App__empty-cards"
            />

            <p data-testid="no-cards">Select a set and click on Gather</p>
          </div>
        ) : (
          magicCards.map((magicCard: MagicCard) => (
            <Card key={magicCard.id} {...magicCard} releaseDate={selectedMagicSet.releaseDate} />
          ))
        )}
      </section>

      {fetchingCards ? null : magicCards.length > 0 ? (
        <section className="App__pagination">
          <button className="App__pagination-control" data-testid="firstpage" onClick={goToFirstPage}>
            First
          </button>
          <button className="App__pagination-control" data-testid="previouspage" onClick={goToPreviousPage}>
            Previous
          </button>
          <button className="App__pagination-control" data-testid="nextpage" onClick={goToNextPage}>
            Next
          </button>
          <button className="App__pagination-control" data-testid="lastpage" onClick={goToLastPage}>
            Last
          </button>
        </section>
      ) : null}
    </div>
  );
}

export default App;
