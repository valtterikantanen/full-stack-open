import { useParams } from 'react-router-dom';

import { Diagnosis, Patient } from '../../types';
import EntryItem from './EntryItem';

interface PatientPageProps {
  patients: Patient[];
  diagnosis: Diagnosis[];
}

export default function PatientPage({ patients, diagnosis }: PatientPageProps) {
  const id = useParams().id;
  const patient = patients.find(patient => patient.id === id);
  if (!patient) return null;
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>gender: {patient.gender}</div>
      <div>occupation: {patient.occupation}</div>
      {patient.entries && patient.entries.length ? (
        <>
          <h3>Entries</h3>
          {patient.entries.map(entry => (
            <EntryItem key={entry.id} entry={entry} diagnosis={diagnosis} />
          ))}
        </>
      ) : (
        ''
      )}
    </div>
  );
}
