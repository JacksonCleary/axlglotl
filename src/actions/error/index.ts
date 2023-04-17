import { type ERROR_TYPES } from "~/models";

export function throwError(type: ERROR_TYPES) {
  const error = new Error(type);
  throw error;
}
