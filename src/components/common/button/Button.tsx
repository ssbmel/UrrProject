type ButtonType = {
  // styleClass: string;
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: 'submit' | 'reset' | 'button';
};

// 긴 다음 버튼 나중에 만들게요 ....
export default function Button(props: ButtonType) {
  const { label, type = 'button' } = props;
  return (
    <button type={type} className="bg-[#D9D9D9] w-full h-[47px] rounded-xl font-medium">
      {label}
    </button>
  );
}
