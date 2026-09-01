import { postJson } from "./configClient";

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

export function sendContactMessage(payload: ContactMessagePayload): Promise<{ message: string }> {
  return postJson<{ message: string }>("/contact-message", payload);
}
