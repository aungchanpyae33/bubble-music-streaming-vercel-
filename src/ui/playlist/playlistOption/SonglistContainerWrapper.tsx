"use client";

interface SonglistContainerWrapperProps extends React.ComponentProps<"div"> {}
function SonglistContainerWrapper({
  children,
  className,
}: SonglistContainerWrapperProps) {
  return (
    <div
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}

export default SonglistContainerWrapper;
