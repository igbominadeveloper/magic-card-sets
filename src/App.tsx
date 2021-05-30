import React, { useState } from 'react';

import { MagicSet } from './types';

import './App.scss';

const sets: Array<MagicSet> = [
  {
    code: '10E',
    name: 'Tenth Edition',
    type: 'core',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '2007-07-13',
    block: 'Core Set',
    onlineOnly: false,
  },
  {
    code: '2ED',
    name: 'Unlimited Edition',
    type: 'core',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '1993-12-01',
    block: 'Core Set',
    onlineOnly: false,
  },
  {
    code: '2XM',
    name: 'Double Masters',
    type: 'masters',
    booster: [
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '2020-08-07',
    onlineOnly: false,
  },
  {
    code: '3ED',
    name: 'Revised Edition',
    type: 'core',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '1994-04-01',
    block: 'Core Set',
    onlineOnly: false,
  },
  {
    code: '4BB',
    name: 'Fourth Edition Foreign Black Border',
    type: 'core',
    releaseDate: '1995-04-01',
    onlineOnly: false,
  },
  {
    code: '4ED',
    name: 'Fourth Edition',
    type: 'core',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '1995-04-01',
    block: 'Core Set',
    onlineOnly: false,
  },
  {
    code: '5DN',
    name: 'Fifth Dawn',
    type: 'expansion',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '2004-06-04',
    block: 'Mirrodin',
    onlineOnly: false,
  },
  {
    code: '5ED',
    name: 'Fifth Edition',
    type: 'core',
    booster: [
      'rare',
      'uncommon',
      'uncommon',
      'uncommon',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
      'common',
    ],
    releaseDate: '1997-03-24',
    block: 'Core Set',
    onlineOnly: false,
  },
];

function App() {
  const [magicSets, setMagicSets] = useState<Array<MagicSet>>(sets);

  return (
    <div className="App">
      <p className="App__header">Select a set from the options here</p>

      <form className="App__form">
        <select>
          {magicSets.map((set: MagicSet) => (
            <option value={set.name} key={set.code}>{set.name}</option>
          ))}
        </select>

        <button type="submit">Gather</button>
      </form>
    </div>
  );
}

export default App;
