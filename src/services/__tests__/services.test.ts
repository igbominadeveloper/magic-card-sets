import { getCards, getSets } from '../index';

test('Get Sets Endpoint', async () => {
  window.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      ok: '200',
      json: () =>
        Promise.resolve({
          sets: [
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
          ],
        }),
    }),
  );

  const response = await getSets();

  expect(response.ok).toBeDefined();

  const setsResponse = await response.json();

  expect(setsResponse.sets.length).toBe(2);
});

test('Get Cards Endpoint', async () => {
  window.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      ok: '200',
      json: () =>
        Promise.resolve({
          cards: [
            {
              name: "Ancestor's Chosen",
              manaCost: '{5}{W}{W}',
              cmc: 7.0,
              colors: ['White'],
              colorIdentity: ['W'],
              type: 'Creature — Human Cleric',
              types: ['Creature'],
              subtypes: ['Human', 'Cleric'],
              rarity: 'Uncommon',
              set: '10E',
              setName: 'Tenth Edition',
              text: "First strike (This creature deals combat damage before creatures without first strike.)\nWhen Ancestor's Chosen enters the battlefield, you gain 1 life for each card in your graveyard.",
              artist: 'Pete Venters',
              number: '1',
              power: '4',
              toughness: '4',
              layout: 'normal',
              multiverseid: '130550',
              imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card',
              variations: ['b7c19924-b4bf-56fc-aa73-f586e940bd42'],
              foreignNames: [
                {
                  name: 'Ausgewählter der Ahnfrau',
                  text: 'Erstschlag (Diese Kreatur fügt Kampfschaden vor Kreaturen ohne Erstschlag zu.)\nWenn der Ausgewählte der Ahnfrau ins Spiel kommt, erhältst du 1 Lebenspunkt für jede Karte in deinem Friedhof dazu.',
                  type: 'Kreatur — Mensch, Kleriker',
                  flavor: '„Es ist der Wille aller, und meine Hand, die ihn ausführt."',
                  imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148411&type=card',
                  language: 'German',
                  multiverseid: 148411,
                },
              ],
              printings: ['10E', 'JUD', 'UMA'],
              originalText:
                "First strike (This creature deals combat damage before creatures without first strike.)\nWhen Ancestor's Chosen comes into play, you gain 1 life for each card in your graveyard.",
              originalType: 'Creature - Human Cleric',
              legalities: [
                {
                  format: 'Commander',
                  legality: 'Legal',
                },
                {
                  format: 'Duel',
                  legality: 'Legal',
                },
              ],
              id: '5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c',
            },
            {
              name: 'Angel of Mercy',
              manaCost: '{4}{W}',
              cmc: 5.0,
              colors: ['White'],
              colorIdentity: ['W'],
              type: 'Creature — Angel',
              types: ['Creature'],
              subtypes: ['Angel'],
              rarity: 'Uncommon',
              set: '10E',
              setName: 'Tenth Edition',
              text: 'Flying\nWhen Angel of Mercy enters the battlefield, you gain 3 life.',
              flavor: 'Every tear shed is a drop of immortality.',
              artist: 'Volkan Baǵa',
              number: '2',
              power: '3',
              toughness: '3',
              layout: 'normal',
              multiverseid: '129465',
              imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129465&type=card',
              variations: ['8fd4e2eb-3eb4-50ea-856b-ef638fa47f8a'],
              foreignNames: [
                {
                  name: 'Engel der Gnade',
                  text: 'Fliegend (Diese Kreatur kann außer von fliegenden Kreaturen und Kreaturen mit Reichweite nicht geblockt werden.)\nWenn der Engel der Gnade ins Spiel kommt, erhältst du 3 Lebenspunkte dazu.',
                  type: 'Kreatur — Engel',
                  flavor: 'Jede ihrer Tränen ist ein Tropfen Unsterblichkeit.',
                  imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=148412&type=card',
                  language: 'German',
                  multiverseid: 148412,
                },
              ],
              printings: ['10E', '8ED', '9ED', 'DDC', 'DVD', 'IMA', 'INV', 'JMP', 'MB1', 'P02', 'PS11', 'PSAL', 'S99'],
              originalText:
                "Flying (This creature can't be blocked except by creatures with flying or reach.)\nWhen Angel of Mercy comes into play, you gain 3 life.",
              originalType: 'Creature - Angel',
              legalities: [
                {
                  format: 'Commander',
                  legality: 'Legal',
                },
                {
                  format: 'Duel',
                  legality: 'Legal',
                },
              ],
              id: '57aaebc1-850c-503d-9f6e-bb8d00d8bf7c',
            },
          ],
        }),
    }),
  );

  const response = await getCards('H20', 2);

  expect(response.ok).toBeDefined();

  const cardsResponse = await response.json();

  expect(cardsResponse.cards.length).toBe(2);
});
