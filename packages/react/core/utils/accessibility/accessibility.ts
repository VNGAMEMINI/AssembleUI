import { generateId } from "../generateId/generateId";

export interface AccessibilityMetadataOptions {
  id: string;
  description?: unknown;
  error?: unknown;
  externalDescribedBy?: string;
  externalInvalid?: boolean | "false" | "true" | "grammar" | "spelling";
}

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

/**
 * Creates accessibility metadata from an explicit, stable control ID.
 *
 * This function is pure and does not generate IDs.
 */
export function createAccessibilityMetadataFromId({
  id,
  description,
  error,
  externalDescribedBy,
  externalInvalid,
}: AccessibilityMetadataOptions): AccessibilityResult {
  const descriptionId =
    description != null ? `${id}-description` : undefined;

  const errorId =
    error != null ? `${id}-error` : undefined;

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
    id,
    descriptionId,
    errorId,
    describedBy,
    ariaInvalid,
  };
}

/**
 * Legacy API.
 *
 * Kept for backward compatibility. New React components should provide
 * a stable ID through React.useId() and use createAccessibilityMetadataFromId.
 */
export function createAccessibilityMetadata({
  id,
  idPrefix,
  description,
  error,
  externalDescribedBy,
  externalInvalid,
}: AccessibilityOptions): AccessibilityResult {
  return createAccessibilityMetadataFromId({
    id: id ?? generateId(idPrefix),
    description,
    error,
    externalDescribedBy,
    externalInvalid,
  });
}
