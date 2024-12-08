import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
// import { pluginReactQuery } from "@kubb/plugin-react-query";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "./swaggerApi.json",
    },
    output: {
      path: "./src/app/api/generated",
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
      // pluginReactQuery({
      //   output: {
      //     path: './hooks',
      //   },
      //   group: {
      //     type: 'tag',
      //     name: ({ group }) => `${group}Hooks`,
      //   },
      //   client: {
      //     dataReturnType: 'full',
      //   },
      //   mutation: {
      //     methods: [ 'post', 'put', 'delete' ],
      //   },
      //   infinite: {
      //     queryParam: 'next_page',
      //     initialPageParam: 0,
      //     cursorParam: 'nextCursor',
      //   },
      //   query: {
      //     methods: [ 'get' ],
      //     importPath: "@tanstack/react-query"
      //   },
      //   suspense: {},
      // }),
    ],
  };
});
