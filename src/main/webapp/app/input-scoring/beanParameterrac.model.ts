import { parameterrac } from './parameterrac.model';
import { parameterracjenisperusahaan } from './parameterracjenisperusahaan.model';
import { parameterracmaxusia } from './parameterracmaxusia.model';
import { parameterracminmasakerja } from './parameterracminmasakerja.model';
import { parameterracminusia } from './parameterracminusia.model';
import { parameterracsegmentasi } from './parameterracsegmentasi.model';
import { parameterracstatuskepegawaian } from './parameterracstatuskepegawaian.model';

export class BeanParameterRac {
  listJenisPerusahaan!: Array<parameterracjenisperusahaan>;
  listMinUsia!: Array<parameterracminusia>;
  listRacMaxUsia!: Array<parameterracmaxusia>;
  listRacMinMasaKerja!: Array<parameterracminmasakerja>;
  listSegmentasi!: Array<parameterracsegmentasi>;
  listStatusKepegawaian!: Array<parameterracstatuskepegawaian>;
  parametermodel!: parameterrac;
}
