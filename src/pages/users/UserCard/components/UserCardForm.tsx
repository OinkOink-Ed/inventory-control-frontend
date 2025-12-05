import { Button } from "@/components/ui/button";
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
import { InputPhone } from "@/components/InputPhone";
import { useNavigate } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";

import { ChevronDown } from "lucide-react";
import {
  useUserCardFormApi,
  useUsersFormApiGetDivision,
  useUsersFormApiGetKabinetsByUserIdForEditUser,
  useUsersFormApiGetRole,
} from "./api/useUserCardFormApi";
import { useUserCardApi } from "../api/useUserCardApi";
import { editCardUserDtoSchemaZOD } from "./shema";
import { useRoleContext } from "@app-providers/RoleProvider/hooks/useRoleContext";
import type { PutEditUserDto, PutEditUserDtoSchema } from "@api/gen";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { Spinner } from "@/components/ui/spinner";
import { formatPhoneNumber } from "@/shared/helpers/formatPhoneNumber";

interface UserCardFormProps {
  id: number;
}

export function UserCardForm({ id }: UserCardFormProps) {
  const navigate = useNavigate();
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { roleName } = useRoleContext();

  const { data, isSuccess } = useUserCardApi(id);
  const { mutateAsync } = useUserCardFormApi(id);
  const { data: roleData, isSuccess: roleSuccess } = useUsersFormApiGetRole();
  const { data: divisionData, isSuccess: divisionSuccess } =
    useUsersFormApiGetDivision();
  const { data: kabinetsData, isSuccess: kabinetsSuccess } =
    useUsersFormApiGetKabinetsByUserIdForEditUser();

  const { clearChoiceOfKabinets, userChoices, setChoiceOfKabinets } =
    useChoiseOfKabinetsForCreateUser();

  const formValues = useMemo(() => {
    return {
      name: data?.name ?? "",
      username: data?.username ?? "",
      role: data?.role?.id ? { id: data.role.id } : undefined,
      lastname: data?.lastname ?? "",
      division: data?.division ?? [],
      kabinets: data?.kabinets ?? [],
      telephone: formatPhoneNumber(data?.telephone ?? "+7"),
      patronimyc: data?.patronimyc ?? "",
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
    subscribe,
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
    if (divisionData) {
      setChoiceOfKabinets({
        userChoices: divisionData.map((item) => {
          return { id: item.id };
        }),
      });
    }
  }, [setChoiceOfKabinets, divisionData]);

  useEffect(() => {
    return () => {
      clearChoiceOfKabinets();
    };
  }, [clearChoiceOfKabinets]);

  const selectedDivisions = watch("division") ?? [];
  const selectedDivisionIds = selectedDivisions
    .filter((div) => div.id !== undefined)
    .map((div) => div.id);

  const initialDivisionIds = useMemo(() => {
    return formValues.division.filter((div) => div.id).map((div) => div.id);
  }, [formValues.division]);

  const filteredKabinets = useMemo(() => {
    if (!kabinetsData) return [];

    const divisionIdsToUse =
      selectedDivisionIds.length > 0 ? selectedDivisionIds : initialDivisionIds;

    return kabinetsData.filter(
      (kabinet) =>
        kabinet.division && divisionIdsToUse.includes(kabinet.division.id),
    );
  }, [kabinetsData, selectedDivisionIds, initialDivisionIds]);

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
      toast.success(res.message, {
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
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
      if (res == ANSWER.RESET) reset();
    }
  }

  return isSuccess ? (
    <>
      <Form
        subscribe={subscribe}
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
            render={({ field }) => {
              const currentValue = field.value?.toString() ?? "";
              const currentRole = data.role; // Роль редактируемого пользователя

              return (
                <FormItem className="h-24 w-[300px]">
                  <FormLabel>Роль</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value ? Number(value) : undefined);
                    }}
                    value={currentValue}
                    disabled={roleName === "admin" || isFormDisabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль пользователя">
                          {/* Всегда показываем название текущей роли из данных пользователя */}
                          {currentRole?.roleName}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleSuccess ? (
                        <>
                          {/* Если текущей роли нет в списке доступных, показываем её как отдельный вариант */}
                          {currentRole &&
                            !roleData.find((r) => r.id === currentRole.id) && (
                              <SelectItem
                                value={currentRole.id.toString()}
                                disabled
                                className="cursor-not-allowed opacity-50"
                              >
                                {currentRole.roleName} (текущая)
                              </SelectItem>
                            )}
                          {/* Доступные для выбора роли */}
                          {roleData.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.roleName}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <SelectItem value="loading" disabled>
                          Идет загрузка данных
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="state"
            render={() => (
              <FormItem className="h-24 w-[300px]">
                <FormLabel>Состояние</FormLabel>
                <FormControl>
                  <Input disabled={true} value={data.state}></Input>
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
                ? field.value.filter((item) => typeof item.id === "number")
                : [];

              const selectedDivisionNames =
                roleName === "admin"
                  ? currentValues.map(() => {
                      const division = divisionData?.[0];
                      if (division) {
                        const regex = /№ \d+/;
                        const match = regex.exec(division.name);
                        return match;
                      }
                    })
                  : currentValues.map((div) => {
                      const division = divisionData?.find(
                        (d) => d.id === div.id,
                      );
                      if (division) {
                        const regex = /№ \d+/;
                        const match = regex.exec(division.name);
                        return match;
                      }
                    });
              const selectedKabinetIds =
                watch("kabinets")?.map((k) => k.id) ??
                data.kabinets.map((kab) => kab.id);

              const lockedDivisionIds =
                kabinetsData
                  ?.filter((kabinet) => selectedKabinetIds.includes(kabinet.id))
                  .map((kabinet) => kabinet.division?.name)
                  .filter((id): id is string => id !== undefined) ??
                data.division.map((item) => item.name);

              return (
                <FormItem
                  className="h-24 w-[300px]"
                  style={{
                    cursor:
                      roleName === "admin" ||
                      roleName === "staff" ||
                      isFormDisabled
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <FormLabel>Подразделения</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={
                          roleName === "admin" ||
                          roleName === "staff" ||
                          isFormDisabled
                        }
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${String(currentValues.length)}`
                          : "Выберите подразделения"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {divisionSuccess ? (
                          divisionData.map((item) => {
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
                          key={String(index) + String(name)}
                          className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <Spinner />
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
                ? field.value.filter((item) => typeof item.id === "number")
                : [];

              const selectedKabionetsNames = currentValues.map((div) => {
                const kabinet =
                  kabinetsData?.find((d) => d.id === div.id) ??
                  data.kabinets.find((d) => d.id === div.id);
                return kabinet;
              });

              return (
                <FormItem
                  className="h-24 w-[300px]"
                  style={{
                    cursor:
                      roleName === "admin" ||
                      roleName === "staff" ||
                      isFormDisabled
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <FormLabel>Кабинеты</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!userChoices}>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={field.disabled}
                      >
                        {currentValues.length > 0
                          ? `Выбрано: ${String(currentValues.length)}`
                          : "Выберите Кабинеты"}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] p-0">
                      <div className="max-h-60 overflow-y-auto p-2">
                        {kabinetsSuccess ? (
                          filteredKabinets.map((item) => (
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
                              <FormLabel className="text-sm">{`${
                                item.number
                              } ${String(item.division?.name)}`}</FormLabel>
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
                          key={String(index) + String(name?.id)}
                          className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs"
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
                onClick={() => {
                  setIsFormDisabled(false);
                }}
                disabled={
                  !(roleName === "admin") &&
                  !(roleName === "admin" && data.role?.roleName === "staff")
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
    <Spinner />
  );
}
