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
import { PostCreateDecommissioningDto } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { createDecommissioningDtoShema } from "./shema";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";
import {
  useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning,
  useDecommissioningCartrdigeFormApiCartridgeModelGetAll,
} from "./api/useDecommissioningCartrdigeFormApi";

interface DecommissioningCartrdigeFormProps {
  warehouseId: number;
}

export function DecommissioningCartrdigeForm({
  warehouseId,
}: DecommissioningCartrdigeFormProps) {
  const navigate = useNavigate();

  const { mutateAsync } =
    useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning();

  const { data, isSuccess } =
    useDecommissioningCartrdigeFormApiCartridgeModelGetAll();

  const form = useForm<PostCreateDecommissioningDto>({
    resolver: zodResolver(createDecommissioningDtoShema),
    defaultValues: {
      count: 0,
      comment: "",
      model: { id: undefined },
      warehouse: { id: warehouseId },
    },
  });

  async function onSubmit(data: PostCreateDecommissioningDto): Promise<void> {
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
            name="comment"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Причина</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите причину списания картриджа"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
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
                        <SelectValue placeholder="Выберите модель картриджа" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isSuccess && data ? (
                        data.data.map((item) => (
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
              Списать
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
