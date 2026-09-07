export type AUIRegistryLayer = "component" | "pattern" | "template";
export type AUIRegistryStatus = "experimental" | "stable" | "deprecated";
export interface AUIRegistryEntry<Layer extends AUIRegistryLayer = AUIRegistryLayer> {
    readonly name: string;
    readonly layer: Layer;
    readonly category: string;
    readonly status: AUIRegistryStatus;
}
