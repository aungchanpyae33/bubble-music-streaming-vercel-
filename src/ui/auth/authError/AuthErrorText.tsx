import { _Translator } from "next-intl";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: _Translator<Record<string, any>, "ErrorMsg">;
};
async function AuthErrorText({ e }: { e: Props["e"] }) {
  return (
    <div className=" text-center max-w-96">
      <h1 className="text-lg mb-2 font-extrabold">{e("authErrorTitle")}</h1>
      <p>{e("authErrorText")}</p>
    </div>
  );
}

export default AuthErrorText;
