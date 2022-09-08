import { IBook, NewBook } from './book.model';

export const sampleWithRequiredData: IBook = {
  id: 37098,
};

export const sampleWithPartialData: IBook = {
  id: 92677,
  kelas: 'Account',
};

export const sampleWithFullData: IBook = {
  id: 67174,
  contoh: 'compress Wooden',
  nama: 'Pizza multi-byte HTTP',
  kelas: 'bandwidth moderator',
};

export const sampleWithNewData: NewBook = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
