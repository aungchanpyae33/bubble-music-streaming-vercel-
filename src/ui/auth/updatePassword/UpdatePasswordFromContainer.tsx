"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import { useNaviSet } from "@/lib/CustomHooks/useNaviSet";
import { supabase } from "@/database/supabase";
import PasswordInput from "../AuthItemGeneral/PasswordInput";
import RootErrorText from "../AuthItemGeneral/RootErrorText";
import SubmitButton from "../AuthItemGeneral/SubmitButton";
type UpdatePasswordFormValue = {
  password: string;
};
function UpdatePasswordFromContainer() {
  const router = useRouter();
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useNaviSet();
  const e = useTranslations("ErrorMsg");
  const methods = useForm<UpdatePasswordFormValue>();
  async function resetA(data: UpdatePasswordFormValue) {
    if (isNavigating) return;
    try {
      loader.start();
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;
      setIsNavigating(true);
      router.push("/");
    } catch (error: unknown) {
      if (isAuthApiError(error)) {
        const message = authErrorReturn(error);
        methods.setError("root", {
          type: "manual",
          message: e(`${message}`),
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: e("wentWrong"),
        });
      }
      setIsNavigating(false);
      loader.done();
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(resetA)} className="space-y-5">
        <PasswordInput />
        <RootErrorText />
        <SubmitButton
          actionText="updatePassword"
          isPending={
            isNavigating ||
            methods.formState.isValidating ||
            methods.formState.isSubmitting
          }
        />
      </form>
    </FormProvider>
  );
}

export default UpdatePasswordFromContainer;
