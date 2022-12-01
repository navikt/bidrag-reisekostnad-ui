import { ApiOperation } from "../enum/api";

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.status === 401) {
      throw Error("No session");
    }
    return res.json();
  });

export function requestBody(type: ApiOperation, body: any): RequestInit {
  return {
    method: type,
    body: JSON.stringify(body),
  };
}
