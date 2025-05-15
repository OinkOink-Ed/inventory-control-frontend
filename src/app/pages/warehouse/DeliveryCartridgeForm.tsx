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
import { useApiCartridgeDeliveryFrom } from "./hooks/useApiCartridgeDeliveryFrom";

interface ReceivingCartridgeFormProps {
  warehouseId: number;
}

export function DeliveryCartridgeForm({
  warehouseId,
}: ReceivingCartridgeFormProps) {
  const {
    cartrdgesCreateDelivery,
    cartridgeModelData,
    cartridgeModelSuccess,
    warehouseData,
    warehouseSuccess,
  } = useApiCartridgeDeliveryFrom(warehouseId);

  const form = useForm<PostCreateDeliveryDtoSchema>({
    resolver: zodResolver(createDeliveryDtoShema),
    defaultValues: {
      count: 0,
      model: { id: undefined },
      warehouse: { id: warehouseId },
      division: {
        id: warehouseData ? warehouseData.data.division?.id : undefined,
      },
      kabinet: { id: undefined },
    },
  });

  async function onSubmit(data: PostCreateDeliveryDtoSchema): Promise<void> {
    try {
      const res = await cartrdgesCreateDelivery.mutateAsync(data);
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
        form.reset();
      }
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
                        <SelectItem key={item.id} value={item.id.toString()}>
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
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="kabinet.id"
              render={({ field }) => (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Кабинет</FormLabel>
                  <Select
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
                      {warehouseSuccess && warehouseData?.data.division ? (
                        warehouseData.data.division.kabinets.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
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
          </div>
        </form>
      </Form>
    </>
  );
}
