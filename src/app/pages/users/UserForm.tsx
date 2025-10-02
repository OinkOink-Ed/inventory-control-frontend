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
import { InputPhone } from "@/components/InputPhone";
import { handlerError } from "@/app/helpers/handlerError";
import { useNavigate } from "react-router";
import { Answer } from "@/app/Errors/Answer";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import {
  useUsersFormApiCreateUser,
  useUsersFormApiGetDivision,
  useUsersFormApiGetKabinetsByUserIdForCreateUser,
  useUsersFormApiGetRole,
} from "./api/useUsersFormApi";

export function UserForm() {
  const navigate = useNavigate();

  const { mutateAsync } = useUsersFormApiCreateUser();
  const { data: roleData, isSuccess: roleSuccess } = useUsersFormApiGetRole();
  const { data: divisionData, isSuccess: divisionSuccess } =
    useUsersFormApiGetDivision();
  const { data: kabinetsData, isSuccess: kabinetsSuccess } =
    useUsersFormApiGetKabinetsByUserIdForCreateUser();

  const { clearChoiceOfKabinets, userChoices, setChoiceOfKabinets } =
    useChoiseOfKabinetsForCreateUser();

  const form = useForm<PostCreateUserDto>({
    mode: "onChange",
    resolver: zodResolver(createUserDtoSchemaZOD),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: { id: undefined },
      lastname: "",
      division: [{ id: undefined }],
      kabinets: [{ id: undefined }],
      state: "active",
      telephone: "",
      patronimyc: "",
    },
  });

  useEffect(() => {
    console.log("Render");
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "division") {
        setChoiceOfKabinets({ userChoices: value.division });
        form.resetField("kabinets");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setChoiceOfKabinets, form]);

  useEffect(() => {
    return () => {
      clearChoiceOfKabinets();
    };
  }, [clearChoiceOfKabinets]);

  async function onSubmit(data: PostCreateUserDto): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(`${res.message}`, {
        position: "top-center",
      });
      form.reset();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      if (res == Answer.RESET) form.reset();
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex flex-wrap justify-center gap-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
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
                <Select
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  value={field.value?.toString() ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль пользователя" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleSuccess && roleData ? (
                      roleData.map((item) => (
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
            name="division"
            render={({ field }) => {
              const currentValues = Array.isArray(field.value)
                ? field.value.filter(
                    (item) => item !== null && typeof item.id === "number",
                  )
                : [];

              return (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Подразделения</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${currentValues.length}`
                          : "Выберите подразделения"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[400px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {divisionSuccess && divisionData ? (
                          divisionData.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-2 p-2"
                            >
                              <Checkbox
                                checked={currentValues.some(
                                  (div) => div.id === item.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...currentValues,
                                      { id: item.id },
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (div) => div.id !== item.id,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <FormLabel className="text-sm">
                                {item.name}
                              </FormLabel>
                            </div>
                          ))
                        ) : (
                          <div className="p-2">Идет загрузка данных...</div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="kabinets"
            render={({ field }) => {
              const currentValues = Array.isArray(field.value)
                ? field.value.filter(
                    (item) => item !== null && typeof item.id === "number",
                  )
                : [];

              return (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Кабинеты</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!userChoices}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${currentValues.length}`
                          : "Выберите Кабинеты"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[400px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {kabinetsSuccess && kabinetsData ? (
                          kabinetsData.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-2 p-2"
                            >
                              <Checkbox
                                checked={currentValues.some(
                                  (div) => div.id === item.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...currentValues,
                                      { id: item.id },
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (div) => div.id !== item.id,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <FormLabel className="text-sm">{`${item.number} ${item.division?.name}`}</FormLabel>
                            </div>
                          ))
                        ) : (
                          <div className="p-2">Идет загрузка данных...</div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="mx-4 flex w-full justify-between">
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <InputPhone
                      placeholder="+7"
                      type="text"
                      {...field}
                      onInput={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-[400px] justify-center self-center">
              <Button type="submit" className="w-[200px]">
                Создать
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
