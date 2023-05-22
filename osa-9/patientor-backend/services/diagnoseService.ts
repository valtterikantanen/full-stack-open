import diagnoseData from '../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

export function getDiagnoses(): Diagnose[] {
  return diagnoses;
}
