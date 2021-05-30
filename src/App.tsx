import React, { useEffect, useState } from 'react';

import Card from './components/Card/Card';
import './App.scss';

import { MagicSet, MagicCard, SelectedMagicSet } from './types';

import { cards } from '../fixtures.json';
import { getSets } from './services';

function App() {
  const [magicSets, setMagicSets] = useState<Array<MagicSet>>([]);
  const [magicCards, setMagicCards] = useState<Array<MagicCard>>(cards);
  const [selectedMagicSet, setSelectedMagicSet] = useState<SelectedMagicSet>({ code: '', name: '', releaseDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const totalPages = () => totalItems / 10;

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
        .then((response) => {
          setMagicSets(response.sets);
          localStorage.setItem('sets', JSON.stringify(response.sets));
        });
    } catch (error) {
      // set the
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages()) setCurrentPage(currentPage + 1);
  };

  const goToFirstPage = () => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const goToLastPage = () => {
    if (currentPage !== totalPages()) setCurrentPage(totalPages);
  };

  useEffect(() => {
    fetchSets();
  }, [])

  return (
    <div className="App">
      <p className="App__header">Select a set from the options here</p>

      <form className="App__form">
        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleMagicSetSelection(event.target.value)}>
          {magicSets.map((set: MagicSet) => (
            <option value={set.code} key={set.code}>
              {set.name}
            </option>
          ))}
        </select>

        <button type="submit">Gather</button>
      </form>

      <section className="App__cards">
        {magicCards.slice(0, 10).map((magicCard: MagicCard) => (
          <Card key={magicCard.id} {...magicCard} releaseDate={selectedMagicSet.releaseDate} />
        ))}
      </section>

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
    </div>
  );
}

export default App;
