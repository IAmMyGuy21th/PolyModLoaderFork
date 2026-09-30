import { PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { EventDispatcher, PMLEvent } from "./events";
declare enum MultiPlayerStatus {
    Host = 0,
    Client = 1,
    None = 2
}
export type MultilpayerEventsMap = {
    car_reset: Extract<PMLEvent, {
        type: "car_reset";
    }>;
    car_update: Extract<PMLEvent, {
        type: "car_update";
    }>;
    end_session: Extract<PMLEvent, {
        type: "end_session";
    }>;
    new_session: Extract<PMLEvent, {
        type: "new_session";
    }>;
    server_message: Extract<PMLEvent, {
        type: "server_message";
    }>;
    players_changed: Extract<PMLEvent, {
        type: "players_changed";
    }>;
    invite_changed: Extract<PMLEvent, {
        type: "invite_changed";
    }>;
};
export declare class MultiplayerApi extends EventDispatcher<MultilpayerEventsMap> {
    pml: PolyModLoader;
    mpHost: any;
    mpClient: any;
    status: MultiPlayerStatus;
    _CarResetCb(sessionId: number, playerId: number, resetCounter: number): void;
    _CarUpdateCb(sessionId: number, playerId: number, resetCounter: number, carState: any): void;
    _EndSessionCb(): void;
    _NewSessionCb(sessionId: number, gameMode: number, trackMetadata: any, trackData: any): void;
    _ServerMessageCb(msg: string): void;
    _PlayersChangedCb(players: any): void;
    _InviteChangedCb(newInvite: any): void;
    constructor(pml: PolyModLoader);
    _construct(mpClass: any, isHost: boolean): void;
    _destruct(): void;
    _preInit(): void;
    _getActiveClass(): any;
    getPing(): any;
    getPlayers(): any;
    getMaxPlayers(): any;
    isInviteAllowed(): any;
    getInvite(): any;
    getInviteIsLoading(): any;
    renewInvite(e?: number): any;
    getPlayerCars(): any;
}
export {};
