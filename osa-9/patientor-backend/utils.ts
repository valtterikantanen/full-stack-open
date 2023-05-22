import { NewPatient, Gender } from './types';

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: string): param is Gender {
  return Object.values(Gender)
    .map(value => value.toString())
    .includes(param);
}

function parseName(name: unknown): string {
  if (!name || !isString(name)) throw new Error('Incorrect or missing name');
  return name;
}

function parseSsn(ssn: unknown): string {
  if (!ssn || !isString(ssn)) throw new Error('Incorrect or missing social security number');
  return ssn;
}

function parseDateOfBirth(dateOfBirth: unknown): string {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
  }
  return dateOfBirth;
}

function parseOccupation(occupation: unknown): string {
  if (!occupation || !isString(occupation)) throw new Error('Incorrect or missing occupation');
  return occupation;
}

function parseGender(gender: unknown): Gender {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
}

export function toNewPatientEntry(object: unknown): NewPatient {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: []
    };

    return newPatientEntry;
  }

  throw new Error('Incorrect data: some of the fields are missing');
}
