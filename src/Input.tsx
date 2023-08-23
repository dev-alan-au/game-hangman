

interface InputProps {
  guess: (letter: string) => void;
  inputField?: React.LegacyRef<HTMLInputElement>;
}

export default function Input({ guess, inputField }: InputProps) {
  return (
    <>
      <input
        style={{ textAlign: 'center', textTransform: 'uppercase', width: '40px', height: '40px', fontSize: '20px' }}
        type="text" size={1} maxLength={1} onChange={ev => guess(ev.target.value?.toUpperCase())} ref={inputField} />
    </>
  )
}