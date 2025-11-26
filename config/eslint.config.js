import { defineConfig } from "eslint";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  // Глобальные игноры
  { ignores: ["dist", ".vite", "node_modules"] },

  // Базовые правила JS
  js.configs.recommended,

  // TypeScript: типо-безопасные + стилистические правила
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // TanStack Query
  ...pluginQuery.configs["flat/recommended"],

  // Основная конфигурация для всего React-кода
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./tsconfig.app.json",
          "./tsconfig.node.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: { version: "18.3" },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh (Vite Fast Refresh)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Маленькие улучшения качества (по желанию можно убрать)
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
    },
  },

  // Отдельный оверрайд для конфигов и скриптов (vite.config.ts, kubb.config.ts и т.д.)
  {
    files: [
      "vite.config.ts",
      "kubb.config.ts",
      "scripts/**/*",
      "*.config.{ts,js}",
      "env.d.ts",
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // В конфигах часто приходится делать "небезопасные" вещи — смягчаем
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",

      // Иногда в конфигах используют any — не кричим
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
