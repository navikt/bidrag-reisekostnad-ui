import { authHandlers } from "./handlers/authHandlers";
import { brukerinfoHandlers } from "./handlers/brukerinfoHandlers";

export const handlers = [...authHandlers, ...brukerinfoHandlers];
