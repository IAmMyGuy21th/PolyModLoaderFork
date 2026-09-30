import { PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { PMLEvent, EventDispatcher } from "./events";
type SimCommunicatorEventMap = {
    newsimworker: Extract<PMLEvent, {
        type: "newsimworker";
    }>;
    onmessagein: Extract<PMLEvent, {
        type: "onmessagein";
    }>;
    onmessageout: Extract<PMLEvent, {
        type: "onmessageout";
    }>;
};
declare enum SimMessage {
    Init = 0,
    Verify = 1,
    TestDeterminism = 2,
    CreateCar = 3,
    DeleteCar = 4,
    StartCar = 5,
    ControlCar = 6,
    PauseCar = 7,
    VerifyResult = 8,
    DeterminismResult = 9,
    UpdateResult = 10,
    UpdateMessages = 11,
    UpdateCallbacks = 12
}
export declare class SimCommunicator extends EventDispatcher<SimCommunicatorEventMap> {
    pml: PolyModLoader;
    RealtimeSim: Worker | undefined;
    SimMessage: typeof SimMessage;
    simMessageCallbacks: {
        [message: string]: string[];
    };
    GhostSim: Worker | undefined;
    AllSims: Worker[];
    constructor(pml: PolyModLoader);
    _preInit(): void;
    _registerSimWorker(worker: Worker, isRealtime: boolean): void;
    registerSimMessage(name: string): SimMessage;
    broadcastMessage(payload: any): void;
    registerSimMessageCallback(message: SimMessage, func: string): void;
}
export {};
