import { Diagnosis, Entry } from '../../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

interface EntryItemProps {
  entry: Entry;
  diagnosis: Diagnosis[];
}

export default function EntryItem({ entry, diagnosis }: EntryItemProps) {
  const diagnoses = diagnosis.filter(diagnosis => entry.diagnosisCodes?.includes(diagnosis.code));

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntry entry={entry} diagnoses={diagnoses} />;
    default:
      throw new Error('There should be no other entry types');
  }
}
