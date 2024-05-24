/// <reference types="react" />
import Map from 'ol/Map.js';
import { OverlayProps } from "./components/Overlay";
export declare const useOpenLayers: () => {
    mapRef: import("react").RefObject<HTMLDivElement>;
    olMap: Map | undefined;
    selectedAcre: OverlayProps | undefined;
    overlayRef: import("react").RefObject<HTMLDivElement>;
};
//# sourceMappingURL=hooks.d.ts.map