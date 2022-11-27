import { ISession } from "../lib/security/session";

export default function getPropertyDescriptorForReqSession(session: ISession): PropertyDescriptor {
  return {
    enumerable: true,
    get() {
      return session;
    },
    set(value) {
      const keys = Object.keys(value);
      const currentKeys = Object.keys(session);

      currentKeys.forEach((key) => {
        if (!keys.includes(key)) {
          // @ts-ignore
          delete session[key];
        }
      });

      keys.forEach((key) => {
        // @ts-ignore
        session[key] = value[key];
      });
    },
  };
}

declare module "http" {
  interface IncomingMessage {
    session: ISession;
  }
}
