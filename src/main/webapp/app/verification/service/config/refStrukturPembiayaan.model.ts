export class refStrukturPembiayaan {
  id?: number;
  app_no_de?: string;
  skema?: string;
  skema_code?: string;
  skema_master?: number | string | null | undefined;
  tenor?: number;
  harga_permintaan?: number | string | null | undefined;
  nilai_pembiayaan?: number | string | null | undefined;
  down_payment?: number | string | null | undefined;
  angsuran?: number | string | null | undefined;
  total_angsuran?: number | string | null | undefined;
  max_dsr?: number;
  max_angsuran?: number | string | null | undefined;
  dsr?: number;
  persentase_pembiayaan_existing: number | string | null | undefined;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string;
  akad: string | null | undefined | number;
  ftv: string | null | undefined | number;
  score: string | null | undefined | number;
  score_desc: string | null | undefined | number;
}
