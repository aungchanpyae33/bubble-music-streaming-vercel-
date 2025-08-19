interface LyricPaddingBlockProps extends React.ComponentProps<"div"> {}
function LyricPaddingBlock({ className, children }: LyricPaddingBlockProps) {
  return (
    <div
      className={`${className} w-full flex items-center  bg-inherit  h-[30px] sticky`}
    >
      {children}
    </div>
  );
}

export default LyricPaddingBlock;
