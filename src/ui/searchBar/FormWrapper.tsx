import Form from "next/form";
import { ReactNode, useContext } from "react";
import { ContextToggle } from "./ToggleContext";
import clsx from "clsx";
interface FormWrapperProps {
  children: ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
  show: boolean;
}
import { useRouter } from "nextjs-toploader/app";
function FormWrapper({ children, inputRef, show }: FormWrapperProps) {
  const { setOpen } = useContext(ContextToggle);
  const route = useRouter();
  function goSearch(FormData: FormData) {
    const input = FormData.get("query") as string;
    route.push(`/search?query=${input}`);
  }
  return (
    <Form
      action={goSearch}
      onSubmit={() => {
        setOpen(false);
        inputRef.current?.blur();
      }}
      className={clsx(
        "w-full px-2  hidden sm:flex h-[70px] bg-inherit  top-0 left-0  absolute items-center  sm:w-auto md:bg-transparent sm:h-auto  sm:static  sm:flex-none sm:items-start",
        {
          unhide: show,
        }
      )}
    >
      {children}
    </Form>
  );
}

export default FormWrapper;
