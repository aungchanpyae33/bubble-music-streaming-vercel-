interface LyricPaddingBlockProps extends React.ComponentProps<"div"> {}
function LyricPaddingBlock({ className }: LyricPaddingBlockProps) {
  return (
    <div className={`${className} w-full bg-inherit  h-[30px] sticky`}></div>
  );
}

export default LyricPaddingBlock;
