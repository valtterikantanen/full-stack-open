import { Work } from '@mui/icons-material';

import { Diagnosis, OccupationalHealthcareEntry } from '../../types';

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

export default function OccupationalHealthCareEntryItem({
  entry,
  diagnoses
}: OccupationalHealthCareEntryProps) {
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
          <Work />
        </span>
        <span style={{ marginLeft: '5px' }}>
          <em>{entry.employerName}</em>
        </span>
      </div>
      <em>{entry.description}</em>
      {diagnoses.length ? (
        <ul>
          {diagnoses.map(diagnose => (
            <li key={diagnose.code}>
              {diagnose.code} {diagnose.name}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
      <div style={{ marginTop: '5px' }}>Diagnose by {entry.specialist}</div>
    </div>
  );
}
