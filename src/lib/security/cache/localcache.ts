import NodeCache from "node-cache";
import {TCache} from "./types";


export function getLocalCache(): TCache {
  const cache = new NodeCache();

  return {
    get: async (key: string)=>cache.get(key) ?? null,
    set: async (key: string, value: string, ttlSeconds: number) => {
      cache.set(key, value, ttlSeconds)
      return Promise.resolve("OK")
    }
  }
}