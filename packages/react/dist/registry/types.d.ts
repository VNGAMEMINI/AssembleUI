export type AUIRegistryStatus = "experimental" | "stable" | "deprecated";
export type AUIComponentCategory = "data" | "feedback" | "forms" | "layout" | "navigation";
export type AUIPatternCategory = "data" | "feedback" | "forms" | "navigation";
export type AUITemplateCategory = "application" | "authentication" | "content";
export type AUIRegistryLayer = "component" | "pattern" | "template";
export interface AUIRegistryEntry<Layer extends AUIRegistryLayer, Category extends AUIComponentCategory | AUIPatternCategory | AUITemplateCategory> {
    readonly name: string;
    readonly layer: Layer;
    readonly category: Category;
    readonly status: AUIRegistryStatus;
}
export type AUIAnyRegistryEntry = AUIRegistryEntry<"component", AUIComponentCategory> | AUIRegistryEntry<"pattern", AUIPatternCategory> | AUIRegistryEntry<"template", AUITemplateCategory>;
