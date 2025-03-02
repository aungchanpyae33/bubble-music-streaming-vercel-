interface Props extends React.ComponentProps<"span"> {
  value: number;
}
function AudioThumbSlider({ value, className }: Props) {
  return (
    <span
      className={className}
      style={{ left: `calc(100% - ${value}%)` }}
    ></span>
  );
}

export default AudioThumbSlider;
