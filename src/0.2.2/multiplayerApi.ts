/*
    This file is part of PolyModLoader

    Copyright (C) 2026 the polytrackmods team

    PolyModLoader is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see https://www.gnu.org/licenses/.
*/

import { MixinType, PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { ObfNames } from "./obfuscation";
import { EventDispatcher, PMLEvent } from "./events";

enum MultiPlayerStatus {
    Host,
    Client,
    None
}

export type MultilpayerEventsMap = {
    car_reset: Extract<PMLEvent, { type: "car_reset" }>;
    car_update: Extract<PMLEvent, { type: "car_update" }>;
    end_session: Extract<PMLEvent, { type: "end_session"}>;
    new_session: Extract<PMLEvent, { type: "new_session"}>;
    server_message: Extract<PMLEvent, { type: "server_message"}>;
    players_changed: Extract<PMLEvent, { type: "players_changed"}>;
    invite_changed:  Extract<PMLEvent, { type: "invite_changed"}>;
};

export class MultiplayerApi extends EventDispatcher<MultilpayerEventsMap> {
    pml: PolyModLoader;
    mpHost: any;
    mpClient: any;
    status: MultiPlayerStatus;
    _CarResetCb(sessionId: number, playerId: number, resetCounter: number) {
        this.dispatchEvent({ type: "car_reset", sessionId, playerId, resetCounter })
    }
    _CarUpdateCb(sessionId: number, playerId: number, resetCounter: number, carState: any) {
        this.dispatchEvent({ type: "car_update", sessionId, playerId, resetCounter, carState})
    }
    _EndSessionCb() {
        this.dispatchEvent({ type: "end_session" })
    }
    _NewSessionCb(sessionId: number, gameMode: number, trackMetadata: any, trackData: any) {
        this.dispatchEvent({ type: "new_session", sessionId, gameMode, trackData, trackMetadata })
    }
    _ServerMessageCb(msg: string) {
        this.dispatchEvent({ type: "server_message", msg })
    }
    _PlayersChangedCb(players: any) {
        this.dispatchEvent({ type: "players_changed", players })
    }
    _InviteChangedCb(newInvite: any) {
        this.dispatchEvent({ type: "invite_changed", newInvite })
    }
    constructor(pml: PolyModLoader) {
        super()
        this.status = MultiPlayerStatus.None
        this.pml = pml;
    }
    _construct(mpClass: any, isHost: boolean) {
        this.status = isHost ? MultiPlayerStatus.Host : MultiPlayerStatus.Client
        isHost ? this.mpHost = mpClass : this.mpClient = mpClass;
        mpClass.addCarResetCallback(this._CarResetCb)
        mpClass.addCarUpdateCallback(this._CarUpdateCb)
        mpClass.addEndSessionCallback(this._EndSessionCb)
        mpClass.addNewSessionCallbackk(this._NewSessionCb)
        mpClass.addServerMessageCallback(this._ServerMessageCb)
        mpClass.addPlayersChangedCallback(this._PlayersChangedCb)
        mpClass.addInviteChangedCallback(this._InviteChangedCb)
    }
    _destruct() {
        this.status = MultiPlayerStatus.None;
    }
    _preInit() {
        this.pml.registerGlobalMixin({
            type: MixinType.INSERT,
            token: ObfNames.Mixins.Multiplayer.HostConstruct,
            func: `ActivePolyModLoader.getMod("pmlapi").multiplayerApi._construct(this, true);`,
        })
        this.pml.registerGlobalMixin({
            type: MixinType.INSERT,
            token: ObfNames.Mixins.Multiplayer.ClientConstruct,
            func: `ActivePolyModLoader.getMod("pmlapi").multiplayerApi._construct(this, false),`,
        })
    }
    _getActiveClass() {
        return this.mpClient ? this.mpClient : this.mpHost
    }
    getPing() {
        return this._getActiveClass().getPing();
    }
    getPlayers() {
        return this._getActiveClass().getPlayers();
    }
    getMaxPlayers() {
        return this._getActiveClass().getMaxPlayers();
    }
    isInviteAllowed() {
        return this._getActiveClass().isInviteAllowed();
    }
    getInvite() {
        return this._getActiveClass().getInvite();
    }
    getInviteIsLoading() {
        return this._getActiveClass().getInviteIsLoading();
    }
    renewInvite(e?: number) {
        return this._getActiveClass().renewInvite(e);
    }
    getPlayerCars() {
        return this.pml.getFromPolyTrack(`(0, R.gn)(ActivePolyModLoader.getMod("pmlapi").multiplayerApi._getActive, as, "f")`);
    }
}