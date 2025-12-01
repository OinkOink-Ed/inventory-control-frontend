import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "docs/swaggerApi.yaml",
    },
    output: {
      path: "src/shared/api/gen",
      clean: true,
    },
    plugins: [
      pluginOas({
        output: {
          path: "jsonApi",
        },
      }),
      pluginTs({
        output: {
          path: "types",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Type`,
        },
        dateType: "date",
      }),
      pluginZod({
        output: {
          path: "schema",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Schemas`,
        },
        dateType: "date",
        inferred: true,
      }),
      pluginClient({
        output: {
          path: "clients",
        },
        group: {
          type: "tag",
        },
        operations: true,
        dataReturnType: "data",
        paramsType: "inline",
        parser: "zod",
        importPath: "src/shared/api/client.ts",
        client: "axios",
      }),
    ],
  };
});
