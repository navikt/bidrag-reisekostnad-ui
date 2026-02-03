# Bidrag Reisekostnad

## bidrag-reisekostnad-ui

UI for å [fordele reisekostnader ved samvær med barn](https://www.nav.no/fordele-reisekostnader).

## Oppsett av lokalt utviklingsmiljø

Installer nødvendige pakker (krever node >= 18):

```bash
npm install
```

Still inn kubectl cluster til dev-gcp:

```bash
kubectl config use-context dev-gcp
```

Eksporter TOKENX variabler til terminalen slik at appen kan autentisere i
dev-gcp. Kjør kommandoen i [loadtokenx.sh](loadtokenx.sh) filen.

Start applikasjonen:

```bash
npm run dev
```

Start nettleser:

```bash
http://localhost:3000
```

Logg inn med syntetisk testbruker og kopier tokenet fra endepunkt
`https://bidrag-reisekostnad.ekstern.dev.nav.no/api/dev/token`.
Lim inn deretter tokenet nederst på `http://localhost:3000` siden.

Syntetisk testbruker kan hentes fra [Dolly](https://dolly.ekstern.dev.nav.no/).

Enkleste testscenariet er å velge testbruker som er foresatt til barn under
15 år.

## Testmiljø

Testmiljøer er tilgjengelige eksternt. Miljøet nærmest likt produksjon finnes
på https://bidrag-reisekostnad.ekstern.dev.nav.no/. For å logge inn trenger man
en testbruker fra [Dolly](https://dolly.ekstern.dev.nav.no/).
