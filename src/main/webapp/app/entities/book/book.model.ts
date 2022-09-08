export interface IBook {
  code: number | null;
  message: string | null;
  result: any;

  id: number;
  // contoh?: string | null;
  nama?: string | null;
  // kelas?: string | null;
  agama?: string | null;
  app_no_de?: string | null;
  program_pembiayaan?: string | null;
  kategori_pekerjaan?: string | null;
}

export type NewBook = Omit<IBook, 'id'> & { id: null };
