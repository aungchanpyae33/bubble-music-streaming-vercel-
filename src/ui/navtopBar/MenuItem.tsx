interface MenuItemProps {
  children: React.ReactNode;
}
function MenuItem({ children }: MenuItemProps) {
  console.log("menu item");
  return (
    <>
      <div className={"flex-1  overflow-hidden text-start  text-nowrap"}>
        {children}
      </div>
    </>
  );
}

export default MenuItem;
