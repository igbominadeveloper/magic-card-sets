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

  const totalPages = () => Math.round(totalItems / 10);

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
      <p className="App__header">Select a set from the options here</p>

      <form className="App__form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleMagicSetSelection(event.target.value)}>
          {magicSets.map((set: MagicSet) => (
            <option value={set.code} key={set.code}>
              {set.name}
            </option>
          ))}
        </select>

        <button disabled={fetchingCards} type="submit">
          {fetchingCards ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <section className="App__cards">
        {fetchingCards ? (
          <div className="App__loader-container">
            <Loader className="App__loader" />
            <p>Loading cards...</p>
          </div>
        ) : magicCards.length === 0 ? (
          <div className="">
            <img src="src/empty-cards.png" alt="No Cards" className="App__empty-cards" />

            <p>No cards yet. Select a set and click on submit</p>
          </div>
        ) : (
          magicCards.map((magicCard: MagicCard) => (
            <Card key={magicCard.id} {...magicCard} releaseDate={selectedMagicSet.releaseDate} />
          ))
        )}
      </section>

      {fetchingCards ? null : magicCards.length > 0 ? (
        <section className="App__pagination">
          <button className="App__pagination-control" data-testid="firstPage" onClick={goToFirstPage}>
            First Page
          </button>
          <button className="App__pagination-control" data-testid="previousPage" onClick={goToPreviousPage}>
            Previous Page
          </button>
          <button className="App__pagination-control" data-testid="nextPage" onClick={goToNextPage}>
            Next Page
          </button>
          <button className="App__pagination-control" data-testid="lastPage" onClick={goToLastPage}>
            Last Page
          </button>
        </section>
      ) : null}
    </div>
  );
}

export default App;
