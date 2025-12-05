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
import { createReceivingDtoSchema } from "./shema";
import { useNavigate } from "react-router";
import {
  useReceivingCartridgeFormApiCartrdgesCreateReceiving,
  useReceivingCartridgeFormApiCreateCartridgeModelGetAll,
} from "./api/useReceivingCartridgeFormApi";
import { useCallback } from "react";
import type { PostCreateReceivingDto } from "@api/gen";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { Spinner } from "@/components/ui/spinner";

export function ReceivingCartridgeForm() {
  const navigate = useNavigate();
  const { mutateAsync } =
    useReceivingCartridgeFormApiCartrdgesCreateReceiving();

  const { data, isSuccess } =
    useReceivingCartridgeFormApiCreateCartridgeModelGetAll();

  const form = useForm<PostCreateReceivingDto>({
    resolver: zodResolver(createReceivingDtoSchema),
    defaultValues: {
      count: 0,
      model: { id: undefined },
      warehouse: { id: undefined },
    },
  });

  const onSubmit = useCallback(
    async function (data: PostCreateReceivingDto): Promise<void> {
      try {
        const res = await mutateAsync(data);
        toast.success(res.message, {
          position: "top-center",
        });
        form.reset();
      } catch (error: unknown) {
        const res = handlerError(error);
        if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
        if (res == ANSWER.RESET) form.reset();
      }
    },
    [form, mutateAsync, navigate],
  );

  return isSuccess ? (
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
                    {data.map((item) => (
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
          <Button type="submit" className="w-[200px] self-center">
            Добавить
          </Button>
        </form>
      </Form>
    </>
  ) : (
    <Spinner />
  );
}
