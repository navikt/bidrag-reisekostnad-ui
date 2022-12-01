import { authHandlers } from "./handlers/authHandlers";
import { brukerinfoHandlers, opprettNyForesporselHandlers } from "./handlers/brukerinfoHandlers";

export const handlers = [...authHandlers, ...brukerinfoHandlers, ...opprettNyForesporselHandlers];
