import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button/Button";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { authRequestDtoSchemaZOD } from "./shema";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";
import { authControllerSignIn, PostAuthDto } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { queryClientInstans } from "@/app/queryClientInstans";
// import { useEffect } from "react";

export function Login() {
  const setProfile = useProfileStore((state) => state.setProfile);

  const navigate = useNavigate();

  // useEffect(() => {
  //   void queryClientInstans.invalidateQueries();
  // }, []);

  const form = useForm<PostAuthDto>({
    resolver: zodResolver(authRequestDtoSchemaZOD),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: PostAuthDto): Promise<void> {
    try {
      const res = await authControllerSignIn(data);

      setProfile(res);
      void queryClientInstans.invalidateQueries();
      void navigate("/");
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) form.reset();
      if (res == Answer.RESET) form.reset();
    }
  }

  return (
    <div className="flex h-svh justify-center">
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="w-80 flex-col space-y-8 self-center rounded-lg border-2 p-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="h-20">
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Логин"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-20">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Пароль"
                    autoComplete="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </div>
  );
}
