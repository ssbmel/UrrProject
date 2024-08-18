import { PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return (
    <button className="w-[174px] h-[52px] bg-[#1A82FF] text-[#FFFFFE] rounded-[8px] 
    hover:bg-[#106FCC] active:bg-[#0A4B8A] transition-all duration-200 text-[18px]">
      {children}
    </button>
  );
}

export default Button;
