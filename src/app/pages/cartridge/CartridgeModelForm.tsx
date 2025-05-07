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

export function CartridgeModelForm() {
  const { mutateAsync } = useIndexReactQuery().cartridgeModelCreate;

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
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex gap-5 border-b-2 p-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[300px]">
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
          <Button type="submit" className="self-center">
            Внести
          </Button>
        </form>
      </Form>
    </>
  );
}
