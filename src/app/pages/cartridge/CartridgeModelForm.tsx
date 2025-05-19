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
import { createModelCartridgeDtoSchemaZOD } from "./shema";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { PostCreateCartridgeModelDto } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";

export function CartridgeModelForm() {
  const { mutateAsync } = useIndexReactQuery().cartridgeModelCreate;
  const navigate = useNavigate();

  const form = useForm<PostCreateCartridgeModelDto>({
    resolver: zodResolver(createModelCartridgeDtoSchemaZOD),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: PostCreateCartridgeModelDto): Promise<void> {
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
          className="flex justify-center gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-[100px] w-[300px]">
                <FormLabel>Введите модель картриджа</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите модель картриджа"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[200px] self-center">
            Внести
          </Button>
        </form>
      </Form>
    </>
  );
}
