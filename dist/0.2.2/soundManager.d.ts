import { PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { PMLEvent, EventDispatcher } from "./events";
type SoundManagerEventMap = {
    soundclassattached: Extract<PMLEvent, {
        type: "soundclassattached";
    }>;
};
export declare class SoundManager extends EventDispatcher<SoundManagerEventMap> {
    soundClass: any;
    buffers: any;
    soundOverrides: {
        [key: string]: string[];
    };
    pml: PolyModLoader;
    constructor(pml: PolyModLoader);
    _preInit(): void;
    getBuffer(e: string): any;
    _loadFromUrls(urls: string[], callback: (buffer: AudioBuffer | null) => void): void;
    overrideImmediate(id: string, newid: string): void;
    load(id: string, urls: string[]): void;
    playUIClick(): void;
    playSound(id: string, gain?: number, start?: number): void;
}
export {};
