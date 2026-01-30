import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { PostCreateCartridgeModelDto } from "@api/gen";
import { ANSWER } from "@/lib/const";
import { handlerError } from "@/lib/helpers";
import { useCartridgeModelFormApi } from "@pages/cartridge/api/useCartridgeModelFormApi";
import { createModelCartridgeDtoSchemaZOD } from "@pages/cartridge/model/shema";

export function CartridgeModelForm() {
  const { mutateAsync } = useCartridgeModelFormApi();
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
      toast.success(res.message, {
        position: "top-center",
      });
      form.reset();
    } catch (error: unknown) {
      const res = handlerError(error);
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
      if (res == ANSWER.RESET) form.reset();
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
