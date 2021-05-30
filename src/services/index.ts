const endpoint = 'https://api.magicthegathering.io/v1';

export const getSets = (): Promise<Response> => fetch(`${endpoint}/sets`);

// export const getCards = () => fetch(`${endpoint}/cards?set=2ED&pageSize=10&page=2`)
