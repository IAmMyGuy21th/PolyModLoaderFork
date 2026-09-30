import { PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { PMLEvent, EventDispatcher } from "./events";
import { BlockColors, ExtraSettings, BoundType } from "./obfuscation";
import { SimCommunicator } from "./simCommunicator";
export type EditorExtrasEventMap = {
    entereditor: Extract<PMLEvent, {
        type: "entereditor";
    }>;
    exitededitor: Extract<PMLEvent, {
        type: "exitededitor";
    }>;
    enteredtrack: Extract<PMLEvent, {
        type: "enteredtrack";
    }>;
    exitedtrack: Extract<PMLEvent, {
        type: "exitedtrack";
    }>;
};
export declare class EditorExtras extends EventDispatcher<EditorExtrasEventMap> {
    editorClass: any;
    track: any;
    BoundType: typeof BoundType;
    BlockColors: typeof BlockColors;
    pml: PolyModLoader;
    _sc: SimCommunicator | undefined;
    currentTrack: {
        name: string;
        author: string;
        lastModified: Date;
    } | null;
    registerStuffCallbacks: Function[];
    categoryDefaults: string[];
    ignoredBlocks: number[];
    registeredBlocks: {
        id: string;
        categoryId: string;
        checksum: string;
        sceneName: string;
        modelName: string;
        colors: BlockColors;
        overlapSpace: number[][][];
        extraSettings?: ExtraSettings;
    }[];
    modelUrls: string[];
    constructor(pml: PolyModLoader);
    _construct(editorClass: any, track: any): void;
    registerCallback(c: Function): void;
    blockNumberFromId(id: string): number;
    get trackEditorClass(): any;
    registerModel(url: string): void;
    registerCategory(id: string, defaultId: string): void;
    registerBlock(id: string, categoryId: string, checksum: string, sceneName: string, modelName: string, colors: BlockColors, overlapSpace: number[][][], extraSettings?: ExtraSettings): void;
    _preInit(): void;
    _init(): void;
}
