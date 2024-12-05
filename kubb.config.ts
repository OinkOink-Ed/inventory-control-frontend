import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginReactQuery } from "@kubb/plugin-react-query";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "./swaggerApi.json",
    },
    output: {
      path: "./src/api/generated",
      clean: true,
    },
    plugins: [
      pluginOas({
        output: {
          path: "./jsonApi",
        },
      }),
      pluginTs({
        output: {
          path: "./types",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Type`,
        },
        dateType: "date",
      }),
      pluginZod({
        output: {
          path: "./schema",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Schemas`,
        },
        typed: true,
        dateType: "date",
      }),
      pluginClient({
        output: {
          path: "./clients",
        },
        group: {
          type: "tag",
        },
        operations: true,
        dataReturnType: "full",
        paramsType: "inline",
        parser: "zod",
        baseURL: "http://localhost",
      }),
      pluginReactQuery({}),
    ],
  };
});
