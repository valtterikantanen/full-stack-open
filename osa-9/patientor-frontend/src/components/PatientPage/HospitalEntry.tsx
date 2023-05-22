import { LocalHospital } from '@mui/icons-material';

import { Diagnosis, HospitalEntry } from '../../types';

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

export default function HospitalEntryItem({ entry, diagnoses }: HospitalEntryProps) {
  if (entry.type !== 'Hospital') return null;
  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
        {entry.date}{' '}
        <span style={{ marginLeft: '5px' }}>
          <LocalHospital />
        </span>
      </div>
      <em>{entry.description}</em>
      <ul>
        {diagnoses?.map(diagnose => (
          <li key={diagnose.code}>
            {diagnose.code} {diagnose.name}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '5px' }}>Diagnose by {entry.specialist}</div>
      Discharged on {entry.discharge.date}. Reason: {entry.discharge.criteria}
    </div>
  );
}
