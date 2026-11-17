import {
  createAccessibilityMetadata,
  createAccessibilityMetadataFromId,
} from "@assemble-ui/react/core";

import type {
  AccessibilityMetadataOptions,
  AccessibilityOptions,
  AccessibilityResult,
} from "@assemble-ui/react/core";

const metadataOptions: AccessibilityMetadataOptions = {
  id: "email-input",
  description: "Email address",
  error: undefined,
  externalDescribedBy: "email-hint",
  externalInvalid: false,
};

const metadata: AccessibilityResult =
  createAccessibilityMetadataFromId(metadataOptions);

const legacyOptions: AccessibilityOptions = {
  idPrefix: "email",
  description: "Email address",
  externalDescribedBy: "email-hint",
};

const legacyMetadata: AccessibilityResult =
  createAccessibilityMetadata(legacyOptions);

// The legacy API must continue accepting an explicitly supplied ID.
const legacyWithId: AccessibilityResult =
  createAccessibilityMetadata({
    id: "custom-email",
    idPrefix: "email",
    error: "Invalid email",
  });

void [metadata, legacyMetadata, legacyWithId];
