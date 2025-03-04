import { queueState, queueStateAction, useOnlyOneSider } from "@/lib/zustand";

function QueueButton() {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  const setIsQueue = useOnlyOneSider(
    (state: queueStateAction) => state.setIsQueue
  );
  console.log("queue", isQueue);
  return (
    <button
      className="bg-black text-white p-1 hidden md:inline-block"
      onClick={() => setIsQueue(!isQueue)}
    >
      que
    </button>
  );
}

export default QueueButton;
