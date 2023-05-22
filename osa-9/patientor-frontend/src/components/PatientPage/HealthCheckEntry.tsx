import { Rating } from '@mui/material';
import { MedicalServices, Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { Diagnosis, HealthCheckEntry } from '../../types';

const StyledRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#0f8304'
  }
});

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

export default function HealthCheckEntryItem({ entry, diagnoses }: HealthCheckEntryProps) {
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
          <MedicalServices />
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
      <div>
        <StyledRating
          value={3 - entry.healthCheckRating ?? 0}
          max={3}
          icon={<Favorite />}
          emptyIcon={<Favorite />}
          readOnly
        />
      </div>
      <div style={{ marginTop: '5px' }}>Diagnose by {entry.specialist}</div>
    </div>
  );
}
