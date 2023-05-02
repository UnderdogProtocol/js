# Overview

## Getting Started

```bash
yarn add @underdog-protocol/js
```

## Example

### Add API Route

```ts
// pages/api/underdog/[...underdog].ts

import NextUnderdog from "@underdog-protocol/js";
import { NetworkEnum } from "@underdog-protocol/types";

export default NextUnderdog({
  apiKey: process.env.UNDERDOG_API_KEY,
  network: NetworkEnum.Devnet,
});
```

### Add React Hook

```tsx
// components/Component/index.tsx

import { useNft, GetNftInput } from "@underdog-protocol/js"

export default function Component() {
  const { nft, loading, refetch } = useNft({
    type: {
      transferable: false,
      compressed: true,
    },
    projectId: 1,
    nftId: 0,
  });

  if (!nft || loading) return null;

  return <p>{nft.name}</p>;
}
```

### Cache Underdog State

```tsx
// pages/_app.tsx

import { AppProps } from "next/app";
import { UnderdogProvider } from "@underdog-protocol/js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UnderdogProvider>
      <Component {...pageProps} />
    </UnderdogProvider>
  );
}
```
