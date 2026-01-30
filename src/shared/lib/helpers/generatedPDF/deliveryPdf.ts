import { ptSansBase64 } from "@/fonts/PTSans-Regular-BASE64";
import type {
  GetResponseAllCartridgeModelDto,
  GetResponseAllUsersByDivisionsDto,
  GetResponseDivisionByWarehouseIdDto,
  GetResponseKabinetsByUserIdDto,
  PostCreateDeliveryDto,
} from "@api/gen";
import jsPDF from "jspdf";

//Нужно подумать где хранить в приложении данные пользователя - думаю при аутентификации хранить в контексте React
//Отказаться от decryptedProfile, и таким образом можно проще хранить и роль и подразделение пользователя - просто при аутентификации отдавать эти данные вместе с token
//Но хранить ли эти данные в storage или же хранить в контексте - если это позволительно
export function deliveryPDF(
  data: PostCreateDeliveryDto,
  cartridgeModelData: GetResponseAllCartridgeModelDto[] | undefined,
  staffData: GetResponseAllUsersByDivisionsDto[] | undefined,
  kabinetsData: GetResponseKabinetsByUserIdDto[] | undefined,
  divisionData: GetResponseDivisionByWarehouseIdDto | undefined
) {
  const selectedCartridge = cartridgeModelData?.find(
    (item) => item.id === data.model?.id
  )?.name;

  const selectedStaff = staffData?.find(
    (item) => item.id === data.accepting?.id
  );
  const selectedKabinet = kabinetsData?.find(
    (item) => item.id === data.kabinet?.id
  )?.number;

  const doc = new jsPDF();

  doc.addFileToVFS("PTSans-Regular.ttf", ptSansBase64);
  doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");
  doc.setFont("PTSans");

  // Установка данных в PDF
  doc.setFontSize(16);
  doc.text("Ведомость выдачи Картриджей", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Название организации: "ГБУЗ ГП №1 г.Сочи" МЗ КК`, 20, 40);
  doc.text(`Подразделение: ${divisionData?.name}`, 20, 50);
  doc.text(`Кабинет: ${selectedKabinet}`, 20, 60);
  doc.text(
    `ФИО получателя: ${selectedStaff?.lastname} ${selectedStaff?.name} ${selectedStaff?.patronimyc}`,
    20,
    70
  );
  doc.text(`ФИО выдавшего: [ФИО из аутентификации]`, 20, 80); // Возьмите из контекста пользователя
  doc.text(`Дата: ${new Date().toLocaleDateString("ru-RU")}`, 20, 90);
  doc.text(`Время: ${new Date().toLocaleTimeString("ru-RU")}`, 20, 100);
  doc.text(`Модель картриджа: ${String(selectedCartridge)}`, 20, 110);
  doc.text(`Количество: ${String(data.count)}`, 20, 120);

  doc.text("Подпись получателя: _______________________", 20, 140);
  doc.text("Подпись выдавшего: _______________________", 20, 150);

  // Сохранение и открытие для печати
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl); // Откроет PDF в новой вкладке для печати
}
