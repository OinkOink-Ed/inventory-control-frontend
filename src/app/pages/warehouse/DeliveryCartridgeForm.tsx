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
import { useNavigate } from "react-router";
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

interface DeliveryCartridgeFormProps {
  warehouseId: number;
}

export function DeliveryCartridgeForm({
  warehouseId,
}: DeliveryCartridgeFormProps) {
  const navigate = useNavigate();

  const { setChoiceOfKabinets, userChoices, clearChoiceOfKabinets } =
    useChoiceOfKabinetsStore();

  const { mutateAsync } = useDeliveryCartridgeFormApiCartrdgesCreateDelivery();
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useDeliveryCartridgeFormApiCartridgeModelGetAll();
  const { data: divisionData } =
    useDeliveryCartridgeFormApiDivisionIdByWarehouseId(warehouseId);
  const { data: staffData, isSuccess: staffSuccess } =
    useDeliveryCartridgeFormApiStaffGetAllByDivisions(warehouseId);
  const { data: kabinetsData, isSuccess: kabinetsSuccess } =
    useDeliveryCartridgeFormApiKabinetsByUserId();

  const form = useForm<PostCreateDeliveryDtoSchema>({
    resolver: zodResolver(createDeliveryDtoShema),
    defaultValues: {
      count: 0,
      model: { id: undefined },
      warehouse: { id: warehouseId },
      division: {
        id: divisionData ? divisionData.data.id : undefined,
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

  async function onSubmit(data: PostCreateDeliveryDtoSchema): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(`${res.data.message}`, {
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
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="flex flex-wrap justify-center gap-5"
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
                    cartridgeModelData.data.map((item) => (
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
          control={form.control}
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
                    staffData.data.map((item) => (
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
          control={form.control}
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
                  {kabinetsSuccess && kabinetsData?.data ? (
                    kabinetsData.data.map((item) => (
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
