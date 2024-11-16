import clsx from "clsx";

interface MenuItemProps {
  children: React.ReactNode;
}
function MenuItem({ children }: MenuItemProps) {
  return (
    <>
      <div
        className={clsx(
          "flex-1  overflow-hidden text-start relative left-2 text-nowrap"
        )}
      >
        {children}
      </div>
    </>
  );
}

export default MenuItem;
