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
import { createDeliveryDtoShema } from "./shema";
import { useNavigate, useParams } from "react-router";
import { useChoiceOfKabinetsStore } from "@/pages/warehouse/store/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useEffect } from "react";
import {
  useDeliveryCartridgeFormApiCartrdgesCreateDelivery,
  useDeliveryCartridgeFormApiCartridgeModelGetAll,
  useDeliveryCartridgeFormApiDivisionIdByWarehouseId,
  useDeliveryCartridgeFormApiKabinetsByUserId,
  useDeliveryCartridgeFormApiStaffGetAllByDivisions,
} from "./api/useDeliveryCartridgeFormApi";
import type { PostCreateDeliveryDtoSchema } from "@api/gen";
import { ANSWER } from "@/lib/const/Answer";
import { deliveryPDF, handlerError } from "@/lib/helpers";

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

  const form = useForm<PostCreateDeliveryDtoSchema>({
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
    const subscription = form.watch((value, { name }) => {
      if (name === "accepting.id") {
        setChoiceOfKabinets({ userChoices: value.accepting?.id });
        form.resetField("kabinet");
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

  useEffect(() => {
    if (divisionData?.id !== undefined) {
      form.setValue("division.id", divisionData.id);
    }
  }, [divisionData, form]);

  async function onSubmit(data: PostCreateDeliveryDtoSchema): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message, {
        position: "top-center",
      });

      deliveryPDF(
        data,
        cartridgeModelData,
        staffData,
        kabinetsData,
        divisionData,
      );

      form.reset();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
      if (res == ANSWER.RESET) form.reset();
    }
  }

  return (
    <Form {...form}>
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
                onValueChange={(value) => {
                  field.onChange(value ? Number(value) : undefined);
                }}
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите модель картриджей" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cartridgeModelSuccess ? (
                    cartridgeModelData.map((item) => (
                      <SelectItem
                        key={`${String(item.id)}+${item.name}`}
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
                onValueChange={(value) => {
                  field.onChange(value ? Number(value) : undefined);
                }}
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите принимающего" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {staffSuccess ? (
                    staffData.map((item) => (
                      <SelectItem
                        key={`${String(item.id)}+${item.lastname}+${
                          item.name
                        }+${item.patronimyc}`}
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
                onValueChange={(value) => {
                  field.onChange(value ? Number(value) : undefined);
                }}
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите кабинет" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kabinetsSuccess ? (
                    kabinetsData.map((item) => (
                      <SelectItem
                        key={`${String(item.id)}+${item.number}`}
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
