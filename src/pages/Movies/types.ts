export type OptionType = {
  label: string;
  value: string;
};

export interface IAddMovieData {
  description: string;
  imageUrl: string;
  videoUrl: string;
  genres: string[];
  actors: string[];
  country: string;
  rating: number;
  title: string;
  year: number;
}

export interface IMovieData extends IAddMovieData {
  id: number;
}
