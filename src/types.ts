export interface MagicSet {
  code: string;
  name: string;
  type: string;
  booster?: Array<string>;
  releaseDate: string;
  block?: string;
  onlineOnly: boolean;
}
