import axios from "axios";

interface ApiErrorResponse {
  [field: string]: string[] | string;
}

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong. Please try again.";
  }

  const data = error.response?.data as ApiErrorResponse | undefined;

  if (!data) {
    return "Unable to connect to the server. Please try again.";
  }

  const messages: string[] = [];

  Object.entries(data).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      value.forEach((message) => {
        messages.push(`${formatFieldName(field)}: ${message}`);
      });
    } else if (typeof value === "string") {
      messages.push(`${formatFieldName(field)}: ${value}`);
    }
  });

  if (messages.length > 0) {
    return messages.join("\n");
  }

  return "Unable to process your request. Please check the information and try again.";
};

const formatFieldName = (field: string): string => {
  return field
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};
