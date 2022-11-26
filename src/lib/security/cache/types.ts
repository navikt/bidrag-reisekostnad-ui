export type TCache = {
  set: (key: string, value: string, ttlSeconds: number)=>Promise<"OK">
  get: (key: string)=>Promise<string|null>
}