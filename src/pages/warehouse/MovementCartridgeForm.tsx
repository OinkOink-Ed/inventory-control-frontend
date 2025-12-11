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
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMovementDtoShema } from "./shema";
import { useNavigate, useParams } from "react-router";
import { useChoiceOfStaffStore } from "@/pages/warehouse/store/choiceOfStaff/useChoiceOfStaffStore";
import { useEffect } from "react";
import {
  useMovementCartridgeFormApiCartrdgesCreateMovement,
  useMovementCartridgeFormApiCartridgeModelGetAll,
  useMovementCartridgeFormApiStaffGetAllByDivisions,
  useMovementCartridgeFormApiWarehouseGetAll,
} from "./api/useMovementCartridgeFormApi";
import type { PostCreateMovementDtoSchema } from "@api/gen";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { Spinner } from "@/components/ui/spinner";

export function MovementCartridgeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutateAsync } = useMovementCartridgeFormApiCartrdgesCreateMovement();
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useMovementCartridgeFormApiCartridgeModelGetAll();

  const { data: warehouseData, isSuccess: warehouseSuccess } =
    useMovementCartridgeFormApiWarehouseGetAll();

  const { data: staffData, isSuccess: staffSuccess } =
    useMovementCartridgeFormApiStaffGetAllByDivisions();

  const { setChoiceOfStaff, warehouseChoices, clearChoiceOfStaff } =
    useChoiceOfStaffStore();

  const form = useForm<PostCreateMovementDtoSchema>({
    resolver: zodResolver(createMovementDtoShema),
    defaultValues: {
      count: 0,
      warehouseFrom: { id: Number(id) },
      warehouseWhere: { id: undefined },
      model: { id: undefined },
      warehouse: { id: Number(id) },
      whoAccepted: { id: undefined },
    },
  });

  async function onSubmit(data: PostCreateMovementDtoSchema): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message, {
        position: "top-center",
      });
      form.reset();
      clearChoiceOfStaff();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
      if (res == ANSWER.RESET) form.reset();
    }
  }

  const warehouseWhereId = useWatch({
    control: form.control,
    name: "warehouseWhere.id",
  });

  useEffect(() => {
    if (warehouseWhereId) {
      setChoiceOfStaff({ warehouseChoices: warehouseWhereId });
      form.resetField("whoAccepted");
    }
  }, [setChoiceOfStaff, form, warehouseWhereId]);

  useEffect(() => {
    return () => {
      clearChoiceOfStaff();
    };
  }, [clearChoiceOfStaff]);

  return cartridgeModelSuccess && warehouseSuccess && staffSuccess ? (
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
                    {cartridgeModelData.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
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
                  onValueChange={(value) => {
                    field.onChange(value ? Number(value) : undefined);
                  }}
                  value={field.value?.toString() ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите склад для поступления" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouseData.map((item) => {
                      if (item.id !== Number(id)) {
                        return (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        );
                      }
                    })}
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
                    onValueChange={(value) => {
                      field.onChange(value ? Number(value) : undefined);
                    }}
                    value={field.value?.toString() ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите кому выдать" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {staffData.map((item) => {
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
                      })}
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
  ) : (
    <Spinner />
  );
}
