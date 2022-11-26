export const fetcher = (url: string) => fetch(url).then((res) => {
  if (res.status === 401){
    throw Error("No session")
  }
  return res.json()
});
