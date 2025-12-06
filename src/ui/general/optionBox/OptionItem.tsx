function OptionItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="h-12 w-full text-sm relative  hover:bg-[#333333]  flex items-center rounded-md active:bg-[#444444] transition-colors duration-200   ">
      {children}
    </li>
  );
}

export default OptionItem;
