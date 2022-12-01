import { authHandlers } from "./handlers/authHandlers";
import { brukerinfoHandlers } from "./handlers/brukerinfoHandlers";
import {
  opprettNyForesporselHandlers,
  trekkeForesporselHandlers,
} from "./handlers/foresporselHandlers";

export const handlers = [
  ...authHandlers,
  ...brukerinfoHandlers,
  ...opprettNyForesporselHandlers,
  ...trekkeForesporselHandlers,
];
