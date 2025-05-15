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
import {
  PostCreateKabinetDto,
  postCreateKabinetDtoSchema,
} from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { useApiKabinetsForm } from "./hooks/useApiKabinetsForm";

interface KabinetsFormProps {
  divisionId: number;
}

export function KabinetsForm({ divisionId }: KabinetsFormProps) {
  const { kabinetCreate } = useApiKabinetsForm(divisionId);

  const form = useForm<PostCreateKabinetDto>({
    resolver: zodResolver(postCreateKabinetDtoSchema),
    defaultValues: {
      number: "",
      division: { id: divisionId },
    },
  });

  async function onSubmit(data: PostCreateKabinetDto): Promise<void> {
    try {
      const res = await kabinetCreate.mutateAsync(data);
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
          <Button type="submit" className="w-[200px] self-center">
            Добавить
          </Button>
        </form>
      </Form>
    </>
  );
}
