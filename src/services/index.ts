const endpoint = 'https://api.magicthegathering.io/v1';
// hardcoded this here because jest support for vite is still in early stage so this breaks

export const getSets = (): Promise<Response> => fetch(`${endpoint}/sets`);

export const getCards = (set = '', page = 1): Promise<Response> =>
  fetch(`${endpoint}/cards?set=${set}&pageSize=12&page=${page}`);
