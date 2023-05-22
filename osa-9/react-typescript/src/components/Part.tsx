import { CoursePart } from '../App';

export default function Part({ coursePart }: { coursePart: CoursePart }) {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
        </p>
      );
    case 'group':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          submit to <a href={coursePart.backgroundMaterial}>{coursePart.backgroundMaterial}</a>
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          required skills: {coursePart.requirements.join(', ')}
        </p>
      );
  }
}
