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
import { PostCreateMovementDtoSchema } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { createMovementDtoShema } from "./shema";
import { useApiCartridgeMovementForm } from "./hooks/useApiCartridgeMovementForm";
import { useNavigate } from "react-router";
import { Answer } from "@/app/Errors/Answer";

interface MovementCartridgeFormProps {
  warehouseId: number;
}

export function MovementCartridgeForm({
  warehouseId,
}: MovementCartridgeFormProps) {
  const navigate = useNavigate();
  const {
    cartrdgesCreateMovement,
    cartridgeModelData,
    cartridgeModelSuccess,
    warehouseData,
    warehouseSuccess,
    staffData,
    staffSuccess,
  } = useApiCartridgeMovementForm(warehouseId);

  const form = useForm<PostCreateMovementDtoSchema>({
    resolver: zodResolver(createMovementDtoShema),
    defaultValues: {
      count: 0,
      warehouseFrom: { id: warehouseId },
      warehouseWhere: { id: undefined },
      model: { id: undefined },
      warehouse: { id: warehouseId },
      whoAccepted: { id: undefined },
    },
  });

  async function onSubmit(data: PostCreateMovementDtoSchema): Promise<void> {
    try {
      const res = await cartrdgesCreateMovement.mutateAsync(data);
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
                    placeholder="Введите количество перемещаемых картриджей"
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
          <FormField
            control={form.control}
            name="whoAccepted.id"
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
                      <SelectValue placeholder="Выберите кому выдать" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {staffSuccess && staffData ? (
                      staffData.data.map((item) => {
                        if (item.financiallyResponsiblePerson) {
                          return (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.lastname} {item.name} {item.patronimyc}
                            </SelectItem>
                          );
                        }
                      })
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
              name="warehouseWhere.id"
              render={({ field }) => (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Склад</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    value={field.value?.toString() ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите склад для поступления" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {warehouseSuccess && warehouseData ? (
                        warehouseData.data.map((item) => (
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
            <Button type="submit" className="w-[200px] self-center">
              Добавить
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
