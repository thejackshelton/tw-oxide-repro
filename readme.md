# The problem

In v4, currently any consumer of a design system has to install tailwindcss and @tailwindcss/vite as a dependency, even though the design system itself may have both as a direct dependency.

In particular, the issue is when you re-export the tailwind css vite plugin, you will get an error from oxide.

To reproduce:

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm build`

You will see an error like this:

```shell
vite v5.3.5 building for production...
[plugin:vite:resolve] [plugin vite:resolve] Module "node:fs/promises" has been externalized for browser compatibility, imported by "tw-oxide-repro/node_modules/.pnpm/@tailwindcss+vite@4.0.15_vite@5.3.5_@types+node@22.13.13_lightningcss@1.29.2_/node_modules/@tailwindcss/vite/dist/index.mjs". See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
[plugin:vite:resolve] [plugin vite:resolve] Module "node:path" has been externalized for browser compatibility, imported by "tw-oxide-repro/node_modules/.pnpm/@tailwindcss+vite@4.0.15_vite@5.3.5_@types+node@22.13.13_lightningcss@1.29.2_/node_modules/@tailwindcss/vite/dist/index.mjs". See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
[plugin:vite:resolve] [plugin vite:resolve] Module "fs" has been externalized for browser compatibility, imported by "tw-oxide-repro/node_modules/.pnpm/@tailwindcss+oxide@4.0.15/node_modules/@tailwindcss/oxide/index.js". See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
[plugin:vite:resolve] [plugin vite:resolve] Module "path" has been externalized for browser compatibility, imported by "tw-oxide-repro/node_modules/.pnpm/@tailwindcss+oxide@4.0.15/node_modules/@tailwindcss/oxide/index.js". See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
[plugin:vite:resolve] [plugin vite:resolve] Module "child_process" has been externalized for browser compatibility, imported by "tw-oxide-repro/node_modules/.pnpm/@tailwindcss+oxide@4.0.15/node_modules/@tailwindcss/oxide/index.js". See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
✓ 49 modules transformed.
x Build failed in 125ms
error during build:
[commonjs--resolver] ../node_modules/.pnpm/@tailwindcss+oxide-darwin-arm64@4.0.15/node_modules/@tailwindcss/oxide-darwin-arm64/tailwindcss-oxide.darwin-arm64.node (1:0): Unexpected character '�' (Note that you need plugins to import files that are not JavaScript)
file: tw-oxide-repro/node_modules/.pnpm/@tailwindcss+oxide@4.0.15/node_modules/@tailwindcss/oxide/index.js:1:0

1: ����
       ���x__TEXT� � __text...
   ^
2: 0�#�Х#�(�$�
              P{{~p��$�
: ��҈�S���<��<����7@��K����      �)a��':�(��I�R�'7����)�R����8��c��C��z��;@�h��?@�������<��=�...

    at getRollupError (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/parseAst.js:397:41)
    at ParseError.initialise (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/node-entry.js:14219:28)
    at convertNode (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/node-entry.js:16113:10)
    at convertProgram (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/node-entry.js:15356:12)
    at Module.setSource (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/node-entry.js:17101:24)
    at async ModuleLoader.addModuleSource (file://tw-oxide-repro/node_modules/.pnpm/rollup@4.37.0/node_modules/rollup/dist/es/shared/node-entry.js:21045:13)
 ELIFECYCLE  Command failed with exit code 1.

❌ Error: Client build failed: Error: Command failed with exit code 1: pnpm run build.client

tw-oxide-repro/user-project:
 ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  user-project@ build: `qwik build`
Exit status 1
 ELIFECYCLE  Command failed.
 ELIFECYCLE  Command failed with exit code 1.
```



