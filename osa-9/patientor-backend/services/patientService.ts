import { v4 as uuid } from 'uuid';

import patientData from '../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientData;

export function getPatients(): Omit<Patient, 'ssn'>[] {
  return patients;
}

export function getNonSensitivePatients(): NonSensitivePatient[] {
  return patients.map(({ ssn: _ssn, entries: _entries, ...otherFields }) => otherFields);
}

export function addPatient(patientData: NewPatient): Patient {
  const newPatient = { id: uuid(), ...patientData };
  patients.push(newPatient);
  return newPatient;
}
