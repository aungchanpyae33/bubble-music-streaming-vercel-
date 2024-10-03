function AudioInfo({ name }: { name: string }) {
  return (
    <div className="test hidden md:block md:min-w-[25%] max-w-[25%] overflow-hidden text-ellipsis">
      {name}
    </div>
  );
}

export default AudioInfo;
