# Bidrag Reisekostnad UI


## Lokal kjøring med innlogget bruker
Følgende må gjøres for å kjøre applikasjonen lokalt med innlogget bruker
* Endre kubectl cluster til dev-gcp ``kubectl config use-context dev-gcp``
* Kjør kommandoen som ligger i filen [loadtokenx.sh](loadtokenx.sh). Dette vil eksportere TOKENX variabler til terminalen
* Start dev-server med kommandoen ``npm run dev``
* Pek nettleser til ``http://localhost:3000``
* Logg inn og hent token fra endepunkt ``https://bidrag-reisekostnad.ekstern.dev.nav.no/api/dev/token`` og lim inn tokenet nederst på siden i ``http://localhost:3000``

Da har du fått startet opp lokalt med innlogget bruker

