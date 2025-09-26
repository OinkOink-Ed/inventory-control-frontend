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
  PostCreateKabinetDto,
  postCreateKabinetDtoSchema,
} from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { useKabinetsFormApi } from "./api/useKabinetsFormApi";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";

interface KabinetsFormProps {
  divisionId: number;
}

export function KabinetsForm({ divisionId }: KabinetsFormProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useKabinetsFormApi(divisionId);

  const form = useForm<PostCreateKabinetDto>({
    resolver: zodResolver(postCreateKabinetDtoSchema),
    defaultValues: {
      number: "",
      division: { id: divisionId },
    },
  });

  async function onSubmit(data: PostCreateKabinetDto): Promise<void> {
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
            name="number"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Номер кабинета</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите номер кабинета"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
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
