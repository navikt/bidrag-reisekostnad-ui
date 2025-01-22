import { http, HttpResponse, delay } from "msw";
import { server } from "../../__mocks__/server";
import { IBrukerinformasjon } from "../../types/foresporsel";

export function fetchBrukerinformation(brukerinformasjon:IBrukerinformasjon) {
  server.use(
    http.get("/api/brukerinformasjon", async () => {
      await delay(100);
      return HttpResponse.json<IBrukerinformasjon>(brukerinformasjon);
    }),
  );
}

export function postForesporsel() {
  server.use(
    http.post("/api/foresporsel/ny", async () => {
      await delay(100);
      return new HttpResponse(null, {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    }),
  );
}
