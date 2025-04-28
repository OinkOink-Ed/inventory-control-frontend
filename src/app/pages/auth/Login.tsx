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
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "./store/useAuthStore";
import { authRequestDtoSchemaZOD } from "./shema";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";
import { authControllerSignIn, PostAuthDto } from "@/app/api/generated";

export function Login() {
  //Просто хочу несколько сторов
  const setAuth = useAuthStore((state) => state.setAuth);
  const setProfile = useProfileStore((state) => state.setProfile);

  const navigate = useNavigate();

  const form = useForm<PostAuthDto>({
    resolver: zodResolver(authRequestDtoSchemaZOD),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: PostAuthDto): Promise<void> {
    //Если бы у меня на сервере было бы обновление токенов, то я мог бы хранить его уже в QueryClient (насколько я понял), и к нему я мог бы через инстантс провайдера обращаться
    //А значит мог бы делать запрос через некоторое время в фоне, после того как умрёт токен (зная время его жизни), посылать запрос на получение токена.
    //Это механика рефреш аксесс, + на сервере я так ещё не умею делать.

    try {
      const res = (await authControllerSignIn(data)).data.access_token;
      setProfile(res);
      setAuth();

      //ESLint подсвечивает что navigate теперь async (по-моему в react-router-dom v6 не была async)
      await navigate("/");
    } catch (error) {
      //В целом можно разобраться как на сервере типизировать ошибки и работать с ними, чтобы потом через kubb из swagger тянуть типизацию этих ошибок
      //И свободно их использовать здесь (наверное). Пока что буду как-то так через axios и понимание того, что мне приходит message

      const typedError: AxiosError = error as AxiosError;
      if (typedError.status === 401) {
        const text = typedError.response?.data as { message: string };

        form.setError("username", { message: `${text.message}` });
        form.setError("password", { message: `${text.message}` });
      } else {
        toast.error("Неизвестная ошибка сервера!", {
          position: "top-center",
        });
      }
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
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </div>
  );
}
