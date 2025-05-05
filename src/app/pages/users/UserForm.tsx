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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserDtoSchemaZOD } from "./shema";
import { PostCreateUserDto } from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { InputPhone } from "@/components/InputPhone";
import { useApiUsersForm } from "./hooks/useApiUsersForm";
import { handlerError } from "@/app/helpers/handlerError";

//Первая загрузка - 4 рендеров
//Повторные переходы - 1 рендер
export function UserForm() {
  const { divisionData, divisionSuccess, mutateAsync, RoleSuccess, roleData } =
    useApiUsersForm();

  const form = useForm<PostCreateUserDto>({
    resolver: zodResolver(createUserDtoSchemaZOD),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      patronimyc: "",
      role: {},
      lastname: "",
      division: {},
      creator: { id: decryptedProfile().id },
      state: "active",
      telephone: "",
    },
  });

  async function onSubmit(data: PostCreateUserDto): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
    } catch (error: unknown) {
      const message = handlerError(error);

      if (message) {
        toast.error(message, {
          position: "top-center",
        });
        form.reset();
      } else {
        toast.error("Неизвестная ошибка!", {
          position: "top-center",
        });
      }
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
            name="username"
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
            name="lastname"
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
                    {RoleSuccess && roleData ? (
                      roleData.data.map((item) => (
                        <SelectItem
                          key={item.roleName}
                          value={item.id.toString()}
                        >
                          {item.roleName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="Идет загрузка данных">
                        Идет загрузка данных
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="division.id"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Подразделение</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите подразделение пользователя" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {divisionSuccess && divisionData ? (
                      divisionData.data.map((item) => (
                        <SelectItem key={item.name} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="Идет загрузка данных">
                        Идет загрузка данных
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem className="w-[400px]">
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <InputPhone
                    placeholder="+7"
                    type="text"
                    {...field}
                    onInput={(e) => {
                      // Ну в таком случае с опцией shouldValidate я отображаю сообщения о том, успешна ли вадиция - но это вызывает каждый раз рендер
                      //Т.е преимущества react-hook-form отлетают
                      form.setValue("telephone", e.currentTarget.value);
                    }}
                    //А тут срабатывает только уход фокуса
                    onBlur={() => {
                      void form.trigger("telephone");
                    }}
                    //Событие onChange вообще никак не влияет
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {Нужно добавить дополнительные поля} */}
          <Button type="submit" className="self-center">
            Добавить
          </Button>
        </form>
      </Form>
    </>
  );
}
