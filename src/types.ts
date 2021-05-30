export interface MagicSet {
  code: string;
  name: string;
  type: string;
  booster?: Array<string> | Array<Array<string> | string>;
  releaseDate: string;
  block?: string;
  onlineOnly: boolean;
}

export interface MagicCard {
  name: string;
  type: string;
  rarity: string;
  set: string;
  setName: string;
  text?: string;
  imageUrl?: string;
  id: string;
  manaCost: string;
  cmc: number;
  colors?: Array<string>;
  colorIdentity: Array<string>;
  types: Array<string>;
  subtypes?: Array<string>;
  artist: string;
  number: string;
  power?: string;
  toughness?: string;
  layout?: string;
  multiverseid?: string;
  variations?: Array<string>;
  foreignNames?: Array<{
    name: string;
    text?: string;
    type: string;
    flavor: string | null;
    imageUrl: string;
    language: string;
    multiverseid: number;
  }>;
  printings?: Array<string>;
  originalText?: string;
  originalType?: string;
  legalities?: Array<{
    format: string;
    legality: string;
  }>;
}

export interface SelectedMagicSet {
  name: string;
  code: string;
  releaseDate: string;
}
