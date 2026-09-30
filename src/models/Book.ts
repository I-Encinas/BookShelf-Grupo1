export type CoverColor = 'coral' | 'yellow' | 'blue' | 'purple';

export type Book = {
  id: string;
  title: string;
  genre: string;
  read: boolean;
  createdAt: number;
  author: string;
  description: string;
  color: CoverColor;
  favorite: boolean;
};

export type BookInput = Pick<Book, 'title' | 'genre' | 'author' | 'description'>;

export const GENRES = ['Novela', 'Ficción', 'Desarrollo personal', 'Misterio', 'Ensayo', 'Historia', 'Otro'];
export const COVER_COLORS: CoverColor[] = ['coral', 'yellow', 'blue', 'purple'];
