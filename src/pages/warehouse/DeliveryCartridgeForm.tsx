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
import { PostCreateDeliveryDtoSchema } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { createDeliveryDtoShema } from "./shema";
import { useNavigate, useParams } from "react-router";
import { Answer } from "@/app/Errors/Answer";
import { useChoiceOfKabinetsStore } from "@/app/stores/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useEffect } from "react";
import {
  useDeliveryCartridgeFormApiCartrdgesCreateDelivery,
  useDeliveryCartridgeFormApiCartridgeModelGetAll,
  useDeliveryCartridgeFormApiDivisionIdByWarehouseId,
  useDeliveryCartridgeFormApiKabinetsByUserId,
  useDeliveryCartridgeFormApiStaffGetAllByDivisions,
} from "./api/useDeliveryCartridgeFormApi";
import { deliveryPDF } from "@/app/helpers/generatedPDF/deliveryPdf";

export function DeliveryCartridgeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { setChoiceOfKabinets, userChoices, clearChoiceOfKabinets } =
    useChoiceOfKabinetsStore();

  const { mutateAsync } = useDeliveryCartridgeFormApiCartrdgesCreateDelivery();
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useDeliveryCartridgeFormApiCartridgeModelGetAll();
  const { data: divisionData } =
    useDeliveryCartridgeFormApiDivisionIdByWarehouseId();
  const { data: staffData, isSuccess: staffSuccess } =
    useDeliveryCartridgeFormApiStaffGetAllByDivisions();
  const { data: kabinetsData, isSuccess: kabinetsSuccess } =
    useDeliveryCartridgeFormApiKabinetsByUserId();

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
  } = useForm<PostCreateDeliveryDtoSchema>({
    resolver: zodResolver(createDeliveryDtoShema),
    defaultValues: {
      count: 0,
      model: { id: undefined },
      warehouse: { id: Number(id) },
      division: {
        id: divisionData?.id,
      },
      accepting: { id: undefined },
      kabinet: { id: undefined },
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "accepting.id") {
        setChoiceOfKabinets({ userChoices: value.accepting?.id });
        resetField("kabinet");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setChoiceOfKabinets, resetField, watch]);

  useEffect(() => {
    return () => {
      clearChoiceOfKabinets();
    };
  }, [clearChoiceOfKabinets]);

  useEffect(() => {
    if (divisionData?.id !== undefined) {
      setValue("division.id", divisionData.id);
    }
  }, [divisionData, setValue]);

  async function onSubmit(data: PostCreateDeliveryDtoSchema): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(`${res.message}`, {
        position: "top-center",
      });

      deliveryPDF(
        data,
        cartridgeModelData,
        staffData,
        kabinetsData,
        divisionData,
      );

      reset();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      if (res == Answer.RESET) reset();
    }
  }

  return (
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
          name="count"
          render={({ field }) => (
            <FormItem className="h-24 w-[400px]">
              <FormLabel>Количество</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите количество картридежй одной модели"
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
          name="model.id"
          render={({ field }) => (
            <FormItem className="h-24 w-[400px]">
              <FormLabel>Модель</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value ? Number(value) : undefined)
                }
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите модель картриджей" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cartridgeModelSuccess && cartridgeModelData ? (
                    cartridgeModelData.map((item) => (
                      <SelectItem
                        key={`${item.id}+${item.name}`}
                        value={item.id.toString()}
                      >
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
          control={control}
          name="accepting.id"
          render={({ field }) => (
            <FormItem className="h-24 w-[400px]">
              <FormLabel>Принимающий</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value ? Number(value) : undefined)
                }
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите принимающего" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {staffSuccess && staffData ? (
                    staffData.map((item) => (
                      <SelectItem
                        key={`${item.id}+${item.lastname}+${item.name}+${item.patronimyc}`}
                        value={item.id.toString()}
                      >
                        {item.lastname} {item.name} {item.patronimyc}
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
          control={control}
          name="kabinet.id"
          render={({ field }) => (
            <FormItem className="h-24 w-[400px]">
              <FormLabel>Кабинет</FormLabel>
              <Select
                disabled={!userChoices}
                onValueChange={(value) =>
                  field.onChange(value ? Number(value) : undefined)
                }
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите кабинет" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kabinetsSuccess && kabinetsData ? (
                    kabinetsData.map((item) => (
                      <SelectItem
                        key={`${item.id}+${item.number}`}
                        value={item.id.toString()}
                      >
                        {item.number}
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

        <Button type="submit" className="w-[200px] self-center">
          Добавить
        </Button>
      </form>
    </Form>
  );
}
