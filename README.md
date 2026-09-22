# three-visual-testing

A demonstration of Three.js visual regression testing with Playwright.

## Development

Install dependencies:

```bash
pnpm install
```

Run local development server:

```bash
pnpm dev
```

Open [localhost:4321](http://localhost:4321) in your browser.

## Testing

Types and linting:

```bash
pnpm test:types
pnpm test:lint
```

Building and testing end-to-end:

```bash
pnpm build
pnpm test:e2e
```

> [!WARNING]  
> The end-to-end test example was made on macOS (Darwin), which means that the example tests from this repo will fail for other operating systems due to low-level rendering differences between them. If you have to do a consistent cross-platform visual regression testing with Playwright, consider using [Docker](https://playwright.dev/docs/docker).
