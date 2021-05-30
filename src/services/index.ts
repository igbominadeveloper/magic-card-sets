const endpoint = 'https://api.magicthegathering.io/v1';

export const getSets = (): Promise<Response> => fetch(`${endpoint}/sets`);

export const getCards = (set = '', page = 1): Promise<Response> => fetch(`${endpoint}/cards?set=${set}&pageSize=10&page=${page}`);
