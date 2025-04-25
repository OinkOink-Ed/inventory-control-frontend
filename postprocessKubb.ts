import fs from "fs";
import path from "path";

// Папки с сгенерированными файлами Kubb
const typesDir = "./src/app/api/generated/types";
const clientsDir = "./src/app/api/generated/clients";

// Функция для рекурсивной обработки файлов
function postprocessKubb(directory: string): void {
  fs.readdirSync(directory).forEach((file: string) => {
    const filePath: string = path.join(directory, file);

    // Если это директория, рекурсивно обрабатываем её
    if (fs.statSync(filePath).isDirectory()) {
      postprocessKubb(filePath);
      return;
    }

    // Читаем содержимое файла
    let content: string = fs.readFileSync(filePath, "utf-8");

    // Заменяем дублирующиеся типы ошибок на ErrorResponseDto
    content = content.replace(
      /CartridgeControllerGetAll(400|403|404|408|500)/g,
      "ErrorResponseDto",
    );

    // Удаляем определения избыточных типов CartridgeControllerGetAllXXX
    content = content.replace(
      /export type CartridgeControllerGetAll(400|403|404|408|500) = ErrorResponseDto;\n/g,
      "",
    );

    // Удаляем некорректные определения ErrorResponseDto = ErrorResponseDto
    content = content.replace(
      /\/\*\*\n\s*\* @description [^\n]+\n\s*\*\/\n\s*export type ErrorResponseDto = ErrorResponseDto;\n/g,
      "",
    );

    if (
      !/^\s*export type ErrorResponseDto = ErrorResponseDto;\s*$/m.test(content)
    ) {
      // Указываем место, после которого добавить строку
      content = content.replace(
        /^(export type\s+[^\n]+;\s*)$/m, // Пример якоря (замените на нужный)
        "\nexport type ErrorResponseDto = ErrorResponseDto;$1",
      );
    }

    // Удаляем лишние импорты для CartridgeControllerGetAllXXX
    content = content.replace(
      /import type \{ CartridgeControllerGetAll(400|403|404|408|500) \} from "[^"]+";\n/g,
      "",
    );

    // Очищаем дублирующиеся импорты ErrorResponseDto
    content = content.replace(
      /(import type \{[^}]*ErrorResponseDto(,\s*ErrorResponseDto)+[^}]*\} from "[^"]+";)/g,
      (match: string) => {
        // Оставляем только один ErrorResponseDto в импорте
        return match.replace(
          /(ErrorResponseDto,\s*)+ErrorResponseDto/g,
          "ErrorResponseDto",
        );
      },
    );

    // Упрощаем union-типы ErrorResponseDto | ErrorResponseDto | ...
    content = content.replace(
      /ErrorResponseDto(\s*\|\s*ErrorResponseDto)+/g,
      "ErrorResponseDto",
    );

    // Сохраняем изменения только если файл изменился
    if (content !== fs.readFileSync(filePath, "utf-8")) {
      fs.writeFileSync(filePath, content);
      console.log(`Обновлён файл: ${filePath}`);
    }
  });
}

// Обрабатываем папки types и clients
try {
  postprocessKubb(typesDir);
  postprocessKubb(clientsDir);
  console.log("Постобработка завершена успешно!");
} catch (error) {
  console.error("Ошибка при постобработке:", error);
}
