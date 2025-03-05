function OverLay({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setOpen(false)}
      className=" z-30 bg-overlay fixed top-0 left-0 bottom-0 right-0 "
    ></div>
  );
}

export default OverLay;
