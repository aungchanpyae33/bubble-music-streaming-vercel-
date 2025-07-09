import React from "react";
interface SubmitButton extends React.ComponentProps<"div"> {
  isPending: boolean;
}
function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button type="submit" disabled={isPending}>
      {isPending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default SubmitButton;
