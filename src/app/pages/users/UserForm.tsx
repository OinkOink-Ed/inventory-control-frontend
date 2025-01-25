import { CreateUserDto, CreateUserDtoSchema } from "@/app/api/generated";
import { Button } from "@/components/ui/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoleList } from "./RoleList";
import { createUserDtoSchemaZOD } from "./shema";

export function UserForm() {
  const { createuser } = useIndexReactQuery();

  const form = useForm<CreateUserDtoSchema>({
    resolver: zodResolver(createUserDtoSchemaZOD),
    defaultValues: {
      name: "",
      nickname: "",
      password: "",
      patronimyc: "",
      role: {},
      surname: "",
    },
  });

  async function onSubmit(data: CreateUserDto): Promise<void> {
    try {
      const res = await createuser.mutateAsync(data);
      toast.success(`${res.data.message}`, {
        // position: "top-center",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex flex-wrap gap-5 border-b-2 p-8"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="w-[400px]">
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Логин"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Фамилию"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Имя"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patronimyc"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Отчество"
                    {...field}
                    className="w-full"
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
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите Пароль"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Это должен быть select - и нужно получать роли пользователей */}
          <FormField
            control={form.control}
            name="role.id"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Роль</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль пользователя" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <RoleList />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-center">
            Добавить
          </Button>
        </form>
      </Form>
    </>
  );
}
