export interface IBook {
  id: number;
  // contoh?: string | null;
  nama?: string | null;
  // kelas?: string | null;
  agama?: string | null;
  app_no_de?: string | null;
  program_pembiayaan?: string | null;
  kategori_pekerjaan?: string | null;
  status_aplikasi_desc?: string | null;
  status_aplikasi?: string | null;
}

export type NewBook = Omit<IBook, 'id'> & { id: null };
