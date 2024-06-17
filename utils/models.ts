export interface FormValidationRule {
  key: string;
  message: string;
  isValid: () => boolean;
}

export type FormErrorType = Record<string, string[]>;
