interface RadioButtonInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export default function RadioButtonInput({ label, value, setValue }: RadioButtonInputProps) {
  return (
    <>
      <input type="radio" checked={value === label} onChange={() => setValue(label)} />
      {label}
    </>
  );
}
