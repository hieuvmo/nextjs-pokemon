export interface IPokemon {
  id: number;
  name: string;
  image: string;
}

export interface IPokemonDetail extends Omit<IPokemon, "id"> {
  type: string[];
  stats: [
    {
      name: string;
      value: number;
    }
  ];
}
