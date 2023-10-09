export interface PokemonListResponse {
  count:    number;
  next:     string;
  previous?: string;
  results:  PokemonItem[];
}

export interface PokemonItem {
  name: string;
  url:  string;
}
