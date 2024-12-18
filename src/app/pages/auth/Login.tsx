import { AuthRequestDto, authRequestDtoSchema } from "@/app/api/generated";
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

export function Login() {
  const form = useForm<z.infer<typeof authRequestDtoSchema>>({
    resolver: zodResolver(authRequestDtoSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  function onSubmit(data: AuthRequestDto): void {
    console.log(data);
  }

  return (
    <div className="flex h-svh justify-center bg-slate-300">
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="w-80 flex-col space-y-8 self-center rounded-lg border-2 border-slate-600 bg-slate-100 p-8"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="Пароль" {...field} />
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
