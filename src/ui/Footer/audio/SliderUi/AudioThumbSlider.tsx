import clsx from "clsx";

function AudioThumbSlider({
  value,
  isDragging,
}: {
  value: number;
  isDragging: boolean;
}) {
  return (
    <span
      className={clsx(
        "absolute group-hover:inline  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]",
        {
          hidden: !isDragging,
          inline: isDragging,
        }
      )}
      style={{ left: `calc(100% - ${value}%)` }}
    ></span>
  );
}

export default AudioThumbSlider;
