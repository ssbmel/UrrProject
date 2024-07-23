type ButtonType = {
  styleClass: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
};

export default function Button(props: ButtonType) {
  const { styleClass, onClick, label } = props;
  return (
    <button className={styleClass} onClick={onClick}>
      {label}
    </button>
  );
}
