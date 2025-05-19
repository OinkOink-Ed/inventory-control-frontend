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
import { PostCreateStaffDto } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { useApiStaffForm } from "./hooks/useApiStaffForm";
import { createStaffDtoSchemaZOD } from "./shema";
import { useNavigate } from "react-router";
import { Answer } from "@/app/Errors/Answer";

//Первая загрузка - 4 рендеров
//Повторные переходы - 1 рендер
export function StaffForm() {
  const navigate = useNavigate();
  const { mutateAsync } = useApiStaffForm();

  const form = useForm<PostCreateStaffDto>({
    resolver: zodResolver(createStaffDtoSchemaZOD),
    defaultValues: {
      name: "",
      lastname: "",
      patronimyc: "",
    },
  });

  async function onSubmit(data: PostCreateStaffDto): Promise<void> {
    try {
      const res = await mutateAsync(data);
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
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
            name="lastname"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Фамилию"
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
            name="name"
            render={({ field }) => (
              <FormItem className="h-24 w-[400px]">
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите Имя"
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
              name="patronimyc"
              render={({ field }) => (
                <FormItem className="h-24 w-[400px]">
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите Отчество"
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
          </div>
        </form>
      </Form>
    </>
  );
}
