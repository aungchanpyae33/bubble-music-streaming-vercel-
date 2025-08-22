interface LyricPaddingBlockProps extends React.ComponentProps<"div"> {}
function LyricPaddingBlock({ className, children }: LyricPaddingBlockProps) {
  return <div className={`${className}`}>{children}</div>;
}

export default LyricPaddingBlock;
