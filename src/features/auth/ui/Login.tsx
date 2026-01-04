import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { PostAuthDto } from "@api/gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useOnSubmit } from "@features/auth/api/useOnSubmit.ts";
import { authRequestDtoSchemaZOD } from "@features/auth/model/shema.ts";

export function Login() {
  const form = useForm<PostAuthDto>({
    resolver: zodResolver(authRequestDtoSchemaZOD),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useOnSubmit({ reset: form.reset });

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
          <Button className="cursor-pointer" type="submit">
            Войти
          </Button>
        </form>
      </Form>
    </div>
  );
}
