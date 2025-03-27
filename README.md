# @cloudflare/vite-plugin unable to use Stripe

A minimal reproduction of a bug in `@cloudflare/vite-plugin` when using Stripe.

## Issue

This project demonstrates an issue with `@cloudflare/vite-plugin` when using Stripe in a Cloudflare Worker.

**GitHub Issue:** [Link to GitHub issue](https://github.com/cloudflare/workers-sdk/issues/ISSUE_NUMBER)

## Setup

1. Clone this repository
2. Install dependencies with pnpm:
   ```
   pnpm install
   ```

## Reproducing the Bug

### Using Vite (Fails)

Running with Vite development server:

```
pnpm dev:vite
```

This produces the following error:

```
❯ pnpm dev:vite

> vite-stripe-bug@0.0.0 dev:vite /Users/adishwar.rishi/playground/vite-stripe-bug
> vite dev


  VITE v6.2.3  ready in 427 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Debug:   http://localhost:5173/__debug
  ➜  press h + enter to show help
11:52:19 am [vite] (vite_stripe_bug) warning: Automatically externalized node built-in module "util" imported from "node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js". Consider adding it to environments.vite_stripe_bug.external if it is intended.
  Plugin: vite:resolve
✘ [ERROR] Cannot read file: /Users/adishwar.rishi/playground/vite-stripe-bug/util

    node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js:1:25:
      1 │ module.exports = require('util').inspect;
        ╵                          ~~~~~~

/Users/adishwar.rishi/playground/vite-stripe-bug/node_modules/.pnpm/esbuild@0.25.1/node_modules/esbuild/lib/main.js:1477
  let error = new Error(text);
              ^

Error: Build failed with 1 error:
node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js:1:25: ERROR: Cannot read file: /Users/adishwar.rishi/playground/vite-stripe-bug/util
    at failureErrorWithLog (/Users/adishwar.rishi/playground/vite-stripe-bug/node_modules/.pnpm/esbuild@0.25.1/node_modules/esbuild/lib/main.js:1477:15)
    at /Users/adishwar.rishi/playground/vite-stripe-bug/node_modules/.pnpm/esbuild@0.25.1/node_modules/esbuild/lib/main.js:946:25
    at /Users/adishwar.rishi/playground/vite-stripe-bug/node_modules/.pnpm/esbuild@0.25.1/node_modules/esbuild/lib/main.js:1355:9
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  errors: [Getter/Setter],
  warnings: [Getter/Setter]
}

Node.js v22.14.0
 ELIFECYCLE  Command failed with exit code 1.
```


### Using Wrangler (Works)

Running with Wrangler development server:

```
pnpm dev:wrangler
```

The server starts successfully and the application works as expected.
