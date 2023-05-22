import { CoursePart } from '../App';
import Part from './Part';

export interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map(part => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
}
