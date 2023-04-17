export enum errorMessage {
  unknownType = "Unknown Type: Error Type was not found in Errors Collection.",
  emptyString = "Error: Empty User Input",
}

export enum ERROR_TYPES {
  UNKNOWN_TYPE = errorMessage.unknownType,
  EMPTY_STRING = errorMessage.emptyString,
}

export enum errorCode {
  unknownType = 500,
  emptyString = 204,
}

export enum ERROR_CODES {
  UNKNOWN_TYPE = errorCode.unknownType,
  EMPTY_STRING = errorCode.emptyString,
}
