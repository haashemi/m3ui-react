# M3UI React

Material 3 Expressive components for React, distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry) and built on [UI SDK](https://ui-sdk.dev/).

Docs and live demos: https://haashemi.github.io/m3ui-react/

## Install

In a project with Tailwind CSS v4 and shadcn/ui initialized:

```bash
npx shadcn@latest registry add @m3ui=https://haashemi.github.io/m3ui-react/r/{name}.json
npx shadcn@latest add @m3ui/theme @m3ui/button
```

Available items: `theme`, `ripple`, `button`, `icon-button`, `button-group`, `split-button`, `fab`, `checkbox`, `radio`, `switch`, `chip`, `toolbar`.

## Development

```bash
pnpm install
vp run dev
```

See [AGENTS.md](AGENTS.md) for the repository layout and conventions.

## License

Released into the public domain under [CC0 1.0](LICENSE).
