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

  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const lastSetTheme = localStorage.getItem('theme');
    if (lastSetTheme) {
      setCurrentTheme(lastSetTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = () => {
    if (currentTheme === 'dark') {
      setCurrentTheme('light');
      localStorage.setItem('theme', 'light');
      return;
    }

    setCurrentTheme('dark');
    localStorage.setItem('theme', 'dark');
  };

  useEffect(() => {
    fetchSets();
  }, []);

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

      <button className="App__theme-toggler" data-testid="theme-toggler" onClick={switchTheme}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <defs>
            <path
              id="moon"
              d="M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z"
              fill="#fff"
            ></path>
            <g id="sun">
              <path
                id="sun"
                d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19H13V22H11zM11 2H13V5H11zM2 11H5V13H2zM19 11H22V13H19z"
              ></path>
              <path transform="rotate(-134.999 5.99 18.01)" d="M4.989 16.51H6.989V19.51H4.989z"></path>
              <path transform="rotate(-45.001 18.01 5.99)" d="M16.51 4.99H19.511000000000003V6.99H16.51z"></path>
              <path transform="rotate(-134.983 5.99 5.99)" d="M4.489 4.99H7.489V6.99H4.489z"></path>
              <path transform="rotate(134.999 18.01 18.01)" d="M17.01 16.51H19.01V19.511000000000003H17.01z"></path>
            </g>
          </defs>
          <use href={currentTheme === 'dark' ? '#sun' : '#moon'}></use>
        </svg>
      </button>
    </div>
  );
}

export default App;
