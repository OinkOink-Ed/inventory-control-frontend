import {
  authControllerSighIn,
  AuthRequestDto,
  authRequestDtoSchema,
} from "@/app/api/generated";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button/Button";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast, Toaster } from "sonner";
import { useAuthStore } from "./state/useAuthStore";
import { redirect } from "react-router";

export function Login() {
  //наверное этот метод стора можно вызывать в другом сторе, в котором я буду сохранять профайл
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof authRequestDtoSchema>>({
    resolver: zodResolver(authRequestDtoSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  async function onSubmit(data: AuthRequestDto): Promise<void> {
    //Если бы у меня на сервере было бы обновление токенов, то я мог бы хранить его уже в QueryClient (насколько я понял), и к нему я мог бы через инстантс провайдера обращаться
    //А значит мог бы делать запрос через некоторое время в фоне, после того как умрёт токен (зная время его жизни), посылать запрос на получение токена.
    //Это механика рефреш аксесс, + на сервере я так ещё не умею делать.

    try {
      const res = await authControllerSighIn(data);
      setAuth();

      //Нужно ещё и профиль сохранить
      redirect("/");

      console.log(res);
    } catch (error) {
      //В целом можно разобраться как на сервере типизировать ошибки и работать с ними, чтобы потом через kubb из swagger тянуть типизацию этих ошибок
      //И свободно их использовать здесь (наверное). Пока что буду как-то так через axios и понимание того, что мне приходит message

      const typedError: AxiosError = error as AxiosError;
      if (typedError.status === 401) {
        const text = typedError.response?.data as { message: string };

        form.setError("nickname", { message: `${text.message}` });
        form.setError("password", { message: `${text.message}` });
      } else {
        toast.error("Неизвестная ошибка сервера!", {
          position: "top-center",
        });
      }
    }
  }

  return (
    <div className="flex h-svh justify-center bg-slate-300">
      <Toaster richColors />
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="w-80 flex-col space-y-8 self-center rounded-lg border-2 border-slate-600 bg-slate-100 p-8"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="h-20">
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="Логин" {...field} />
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
                  <Input type="password" placeholder="Пароль" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
