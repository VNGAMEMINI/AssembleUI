import { generateId } from "../generateId/generateId";

export interface AccessibilityOptions {
  id?: string;
  idPrefix: string;
  description?: unknown;
  error?: unknown;
  externalDescribedBy?: string;
  externalInvalid?: boolean | "false" | "true" | "grammar" | "spelling";
}

export interface AccessibilityResult {
  id: string;
  descriptionId?: string;
  errorId?: string;
  describedBy?: string;
  ariaInvalid?: boolean | "false" | "true" | "grammar" | "spelling";
}

export function createAccessibilityMetadata({
  id,
  idPrefix,
  description,
  error,
  externalDescribedBy,
  externalInvalid,
}: AccessibilityOptions): AccessibilityResult {
  const controlId = id ?? generateId(idPrefix);

  const descriptionId =
    description != null
      ? `${controlId}-description`
      : undefined;

  const errorId =
    error != null
      ? `${controlId}-error`
      : undefined;

  const generatedDescribedBy = [
    description != null && error == null
      ? descriptionId
      : undefined,
    errorId,
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy = [
    externalDescribedBy,
    generatedDescribedBy,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const ariaInvalid =
    error != null
      ? true
      : externalInvalid;

  return {
    id: controlId,
    descriptionId,
    errorId,
    describedBy,
    ariaInvalid,
  };
}
