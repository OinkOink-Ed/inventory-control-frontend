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
import { PutEditUserDto, PutEditUserDtoSchema } from "@/app/api/generated";
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
import { useEffect, useMemo, useState } from "react";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";

import { ChevronDown } from "lucide-react";
import { formatPhoneNumber } from "@/app/helpers/formatPhoneNumber";
import {
  useUserCardFormApi,
  useUsersFormApiGetDivision,
  useUsersFormApiGetKabinetsByUserIdForEditUser,
  useUsersFormApiGetRole,
} from "./api/useUserCardFormApi";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useUserCardApi } from "../api/useUserCardApi";
import { editCardUserDtoSchemaZOD } from "./shema";

interface UserCardFormProps {
  id: number;
}

export function UserCardForm({ id }: UserCardFormProps) {
  const navigate = useNavigate();

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { mutateAsync } = useUserCardFormApi(id);

  const { data: roleData, isSuccess: roleSuccess } = useUsersFormApiGetRole();
  const { data: divisionData, isSuccess: divisionSuccess } =
    useUsersFormApiGetDivision();
  const { data: kabinetsData, isSuccess: kabinetsSuccess } =
    useUsersFormApiGetKabinetsByUserIdForEditUser();

  const { data, isSuccess } = useUserCardApi(id);

  useEffect(() => {
    console.log("render");
  });

  const { clearChoiceOfKabinets, userChoices, setChoiceOfKabinets } =
    useChoiseOfKabinetsForCreateUser();

  const formValues = useMemo(() => {
    return {
      name: data?.data.name ?? "",
      username: data?.data.username ?? "",
      role: data?.data.role ?? undefined,
      lastname: data?.data.lastname ?? "",
      division: data?.data.division ?? [],
      kabinets: data?.data.kabinets ?? [],
      telephone: formatPhoneNumber(data?.data.telephone ?? "+7"),
      patronimyc: data?.data.patronimyc ?? "",
    };
  }, [data]);

  const {
    formState,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    getFieldState,
    getValues,
    register,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
  } = useForm<PutEditUserDto>({
    mode: "onChange",
    resolver: zodResolver(editCardUserDtoSchemaZOD),
    defaultValues: formValues,
    disabled: isFormDisabled,
  });

  useEffect(() => {
    if (isSuccess) {
      reset(formValues);
    }
  }, [isSuccess, reset, formValues]);

  useEffect(() => {
    const divisionValue = getValues("division");

    if (
      divisionValue &&
      Array.isArray(divisionValue) &&
      divisionValue.length > 0
    ) {
      setChoiceOfKabinets({ userChoices: divisionValue });
    } else if (data?.data.division) {
      setChoiceOfKabinets({ userChoices: data.data.division });
    }
  }, [setChoiceOfKabinets, data, getValues]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "division") {
        setChoiceOfKabinets({ userChoices: value.division });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setChoiceOfKabinets, watch]);

  useEffect(() => {
    return () => {
      clearChoiceOfKabinets();
    };
  }, [clearChoiceOfKabinets]);

  async function onSubmit(data: PutEditUserDtoSchema): Promise<void> {
    try {
      const changedData: PutEditUserDtoSchema = {};

      if (Object.keys(formState.dirtyFields).length === 0) {
        toast.success(`Нет скорректированных данных`, {
          position: "top-center",
        });
        return;
      }

      Object.keys(formState.dirtyFields).forEach((key) => {
        const fieldKey = key as keyof PutEditUserDtoSchema;

        if (!(fieldKey in data) || data[fieldKey] === undefined) {
          toast.success(`Нет скорректированных данных`, {
            position: "top-center",
          });
          reset();
          return;
        }

        switch (fieldKey) {
          case "username":
          case "name":
          case "lastname":
          case "telephone":
          case "patronimyc":
            changedData[fieldKey] = data[fieldKey];
            break;
          case "role":
            changedData[fieldKey] = data[fieldKey];
            break;
          case "division":
          case "kabinets":
            changedData[fieldKey] = data[fieldKey];
            break;
        }
      });

      const res = await mutateAsync(data);
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        reset(data, {
          keepValues: true,
          keepDirty: false,
        });
      }, 0);
      setIsFormDisabled(true);
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      if (res == Answer.RESET) reset();
    }
  }

  return isSuccess ? (
    <>
      <Form
        formState={formState}
        control={control}
        reset={reset}
        watch={watch}
        clearErrors={clearErrors}
        getFieldState={getFieldState}
        getValues={getValues}
        handleSubmit={handleSubmit}
        register={register}
        resetField={resetField}
        setError={setError}
        setFocus={setFocus}
        setValue={setValue}
        trigger={trigger}
        unregister={unregister}
      >
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="flex flex-wrap justify-center gap-5"
        >
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
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
            control={control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
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
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
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
            control={control}
            name="patronimyc"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
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
            control={control}
            name="role.id"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
                <FormLabel>Роль</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  value={field.value?.toString() ?? ""}
                  disabled={field.disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль пользователя"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleSuccess && roleData ? (
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
            name="state"
            render={() => (
              <FormItem className="h-24 w-[300px]">
                <FormLabel>Состояние</FormLabel>
                <FormControl>
                  <Input disabled={true} value={data?.data.state}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="division"
            render={({ field }) => {
              const currentValues = Array.isArray(field.value)
                ? field.value.filter(
                    (item) => item !== null && typeof item.id === "number",
                  )
                : [];

              const selectedDivisionNames =
                decryptedProfile().role.roleName !== "admin"
                  ? currentValues.map(() => {
                      const division = divisionData?.data.find((item) => item);
                      if (division) {
                        const regex = /№ \d+/;
                        const match = regex.exec(division.name);
                        return match;
                      }
                    })
                  : currentValues.map((div) => {
                      const division = divisionData?.data?.find(
                        (d) => d.id === div.id,
                      );
                      if (division) {
                        const regex = /№ \d+/;
                        const match = regex.exec(division.name);
                        return match;
                      }
                    });

              const selectedKabinetIds =
                watch("kabinets")?.map((k) => k.id) ?? [];

              const lockedDivisionIds =
                kabinetsData?.data
                  ?.filter((kabinet) => selectedKabinetIds.includes(kabinet.id))
                  .map((kabinet) => kabinet.division?.name)
                  .filter((id): id is string => id !== undefined) ?? [];

              return (
                <FormItem className="h-24 w-[300px]">
                  <FormLabel>Подразделения</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={field.disabled}
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${currentValues.length}`
                          : "Выберите подразделения"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {divisionSuccess && divisionData ? (
                          divisionData.data.map((item) => {
                            const isLocked = lockedDivisionIds.includes(
                              item.name,
                            );
                            const isChecked = currentValues.some(
                              (div) => div.id === item.id,
                            );

                            return (
                              <div
                                key={item.id}
                                className="flex items-center space-x-2 p-2"
                              >
                                <Checkbox
                                  checked={currentValues.some(
                                    (div) => div.id === item.id,
                                  )}
                                  disabled={isLocked && isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...currentValues,
                                        { id: item.id },
                                      ]);
                                    } else if (!isLocked) {
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
                            );
                          })
                        ) : (
                          <div className="p-2">Идет загрузка данных...</div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {selectedDivisionNames.length > 0 ? (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {selectedDivisionNames.map((name, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <SpinnerLoad />
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={control}
            name="kabinets"
            render={({ field }) => {
              const currentValues = Array.isArray(field.value)
                ? field.value.filter(
                    (item) => item !== null && typeof item.id === "number",
                  )
                : [];
              const selectedKabionetsNames = currentValues.map((div) => {
                const kabinet = kabinetsData?.data?.find((d) => d.id == div.id);
                return kabinet;
              });

              return (
                <FormItem className="h-24 w-[300px]">
                  <FormLabel>Кабинеты</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!userChoices}>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={field.disabled}
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${currentValues.length}`
                          : "Выберите Кабинеты"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {kabinetsSuccess && kabinetsData ? (
                          kabinetsData.data.map((item) => (
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
                  {selectedKabionetsNames.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {selectedKabionetsNames.map((name, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground"
                        >
                          {name?.number}
                        </span>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="telephone"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
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
          <div className="flex w-[300px] items-center justify-start gap-4">
            {isFormDisabled ? (
              <Button
                type="button"
                className="w-[200px]"
                onClick={() => setIsFormDisabled(false)}
                disabled={
                  !isFormDisabled ||
                  decryptedProfile().role.roleName !== "admin"
                }
              >
                Редактировать
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="w-[200px]"
                  onClick={() => {
                    setIsFormDisabled(true);
                    reset();
                  }}
                  disabled={isFormDisabled}
                >
                  Отмена
                </Button>

                <Button className="w-[200px]" disabled={isFormDisabled}>
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  ) : (
    <SpinnerLoad />
  );
}
