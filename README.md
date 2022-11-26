# Bidrag Reisekostnad UI


## Lokal kjøring med innlogget bruker
Følgende må gjøres for å kjøre applikasjonen lokalt med innlogget bruker
* Endre kubectl cluster til dev-gcp ``kubectl config use-context dev-gcp``
* Kjør kommandoen som ligger i filen [loadtokenx.sh](loadtokenx.sh). Dette vil eksportere TOKENX variabler til terminalen
* Start dev-server med kommandoen ``npm run dev``
* Pek nettleser til ``http://localhost:3000``
* Logg inn og hent token fra endepunkt ``https://bidrag-reisekostnad.dev.nav.no/api/dev/token`` og lim inn tokenet nederst på siden i ``http://localhost:3000``

Da har du fått startet opp lokalt med innlogget bruker


#### Opprett redis passord on kubernetes
Bidrag-ui bruker redis for session lagring. For å kjøre bidrag-ui på NAIS må en redis secret bli opprettet. Redis secret brukes for sikker kommunikasjon med redis instansen.
Kjør følgende kommando for å opprette secret på namespace bidrag

``
kubectl create secret generic bidrag-ui-redis-password --from-literal=REDIS_PASSWORD=$(cat /dev/urandom | env LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1) -n=bidrag
``
