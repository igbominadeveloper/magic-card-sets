import { render, screen } from '@testing-library/react';

import { MagicCard } from '../../../types';

import Card from '../Card';

const props: MagicCard = {
  name: 'Ancestor Chosen',
  type: 'Creature — Human Cleric',
  rarity: 'Uncommon',
  set: '10E',
  setName: 'Tenth Edition',
  text: 'First strike (This creature deals combat damage before creatures without first strike',
  imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card',
  id: '9889-5849854-894885',
  manaCost: '{5}{W}{W}',
  cmc: 7.0,
  colorIdentity: ['W'],
  types: ['Creature'],
  artist: 'Pete Venters',
  number: '1',
  power: '4',
  toughness: '4',
  layout: 'normal',
  multiverseid: '130550',
  variations: ['b7c19924-b4bf-56fc-aa73-f586e940bd42'],
  printings: ['10E', 'JUD', 'UMA'],
  originalText: 'Original Text',
  originalType: 'Creature - Human Cleric',
};

describe('Card Component', () => {
  test('renders with all the required props', () => {
    render(<Card {...props} releaseDate="2020-10-05" />);

    const cardName = screen.getByText(/Ancestor Chosen/i);
    const cardSetName = screen.getByText(props.setName);
    const releaseDate = screen.getByText(/2020-10-05/);
    const rarity = screen.getByText(props.rarity);
    const type = screen.getByText(props.type);

    expect(cardName).toBeInTheDocument();
    expect(cardSetName).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(rarity).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });

  test('renders a default image when the image is not passed', () => {
    props.imageUrl = '';

    render(<Card {...props} releaseDate="2020-10-05" />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '/src/blank-scroll.svg');
  });
});
