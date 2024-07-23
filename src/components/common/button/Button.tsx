type ButtonType = {
  styleClass: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: 'submit' | 'reset' | 'button';
};

export default function Button(props: ButtonType) {
  const { styleClass, onClick, label, type = 'button' } = props;
  return (
    <button type={type} className={styleClass} onClick={onClick}>
      {label}
    </button>
  );
}
