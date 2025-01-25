import {
  CreateModelCartridgeDto,
  CreateModelCartridgeDtoSchema,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
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

export function SupplementForm() {
  const { createModelCartridge } = useIndexReactQuery();

  const form = useForm<CreateModelCartridgeDtoSchema>({
    resolver: zodResolver(createModelCartridgeDtoSchemaZOD),
    defaultValues: {
      creator: {
        id: 0,
      },
      modelName: "",
      printerName: "",
    },
  });

  async function onSubmit(data: CreateModelCartridgeDto): Promise<void> {
    try {
      data.creator.id = decryptedProfile().id;
      const res = await createModelCartridge.mutateAsync(data);
      toast.success(`${res.data.message}`, {
        // position: "top-center",
      });
    } catch (error) {
      console.log(error);
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
            name="modelName"
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
          <FormField
            control={form.control}
            name="printerName"
            render={({ field }) => (
              <FormItem className="h-24 w-[300px]">
                <FormLabel>Введите модель принтера</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите модель принтера"
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
