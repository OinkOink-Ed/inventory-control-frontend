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
import { useNavigate } from "react-router";
import { Answer } from "@/app/Errors/Answer";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useEffect } from "react";
import {
  useMovementCartridgeFormApiCartrdgesCreateMovement,
  useMovementCartridgeFormApiCartridgeModelGetAll,
  useMovementCartridgeFormApiStaffGetAllByDivisions,
  useMovementCartridgeFormApiWarehouseGetAll,
} from "./api/useMovementCartridgeFormApi";

interface MovementCartridgeFormProps {
  warehouseId: number;
}

export function MovementCartridgeForm({
  warehouseId,
}: MovementCartridgeFormProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useMovementCartridgeFormApiCartrdgesCreateMovement();
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useMovementCartridgeFormApiCartridgeModelGetAll();

  const { data: warehouseData, isSuccess: warehouseSuccess } =
    useMovementCartridgeFormApiWarehouseGetAll();

  const { data: staffData, isSuccess: staffSuccess } =
    useMovementCartridgeFormApiStaffGetAllByDivisions(warehouseId);

  const { setChoiceOfStaff, warehouseChoices, clearChoiceOfStaff } =
    useChoiceOfStaffStore();

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
      const res = await mutateAsync(data);
      toast.success(`${res.message}`, {
        position: "top-center",
      });
      form.reset();
      clearChoiceOfStaff();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      if (res == Answer.RESET) form.reset();
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "warehouseWhere.id") {
        setChoiceOfStaff({ warehouseChoices: value.warehouseWhere?.id });
        form.resetField("whoAccepted");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setChoiceOfStaff, form]);

  useEffect(() => {
    return () => {
      clearChoiceOfStaff();
    };
  }, [clearChoiceOfStaff]);

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
                      cartridgeModelData.map((item) => (
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
                      warehouseData.map((item) => {
                        if (item.id !== warehouseId) {
                          return (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
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
              name="whoAccepted.id"
              render={({ field }) => (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Принимающий</FormLabel>
                  <Select
                    disabled={!warehouseChoices}
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
                        staffData.map((item) => {
                          if (item.role?.roleName === "user") {
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
            <Button type="submit" className="w-[200px] self-center">
              Добавить
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
