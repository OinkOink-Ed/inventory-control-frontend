import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { CartridgeModelForm } from "./CartridgeModelForm";
import { SpinnerLoad } from "@/components/SpinnerLoad";

export function CartridgeModelTable() {
  const { data, isSuccess } = useIndexReactQuery().cartridgeModelGetAllDetailed;

  return isSuccess ? (
    <DataTable
      data={data.data}
      columns={columns}
      titleTable="Список моделей картриджей"
      defaultSort="Модель"
      dialog={
        <DialogForm
          title="Создание модели картриджа"
          buttonName="Добавить модель картриджа"
          form={<CartridgeModelForm />}
        />
      }
    />
  ) : (
    <SpinnerLoad />
  );
}
