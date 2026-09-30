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

import {
    PolyMod,
    PolyModLoader,
} from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { ObfNames, BlockColors, BoundType } from "./obfuscation";
import { EditorExtras } from "./editorExtras";
import { SimCommunicator } from "./simCommunicator";
import { SoundManager } from "./soundManager";
import { MultiplayerApi } from "./multiplayerApi";

class PMLAPI extends PolyMod {
    editorExtras: EditorExtras | undefined;
    simCommunicator: SimCommunicator | undefined;
    ObfNames = ObfNames;
    soundManager: SoundManager | undefined;
    multiplayerApi: MultiplayerApi | undefined;
    pml: PolyModLoader | undefined;
    preInit = (pml: PolyModLoader) => {
        this.simCommunicator = new SimCommunicator(pml);
        this.editorExtras = new EditorExtras(pml);
        this.soundManager = new SoundManager(pml);
        this.multiplayerApi = new MultiplayerApi(pml);
        this.editorExtras.registerCallback(() => {
            this.editorExtras?.registerCategory("Custom", "TurnSharp");
            this.editorExtras?.registerModel(`${this.modBaseUrl}/copy_pillars.glb`);
            this.editorExtras?.registerBlock(
                "CopyPillar",
                "Custom",
                "b235ea87337c17de7cbaecaf3d381fff9782e8379bcbc1c6cc9882da4aa1da15",
                "CopyPillars",
                "CopyPillar1",
                BlockColors.Environment,
                [
                    [
                        [-1, 0, -1],
                        [0, 0, 0],
                    ],
                ],
                { ignoreOnExport: false, specialSettings: { type: BoundType.Finish, center: [0,3,0], size: [3, 3, 3] }, startOffset: undefined}
            );
            this.editorExtras?.registerBlock(
                "CopyPillar2",
                "Custom",
                "b235ea87337c17de7cbaecaf3d381fff9782e8379bcbc1c6cc9882da4aa1da15",
                "CopyPillars",
                "CopyPillar2",
                BlockColors.Environment,
                [
                    [
                        [-1, 0, -1],
                        [0, 0, 0],
                    ],
                ],
                { ignoreOnExport: false, specialSettings: { type: BoundType.Checkpoint, center: [0,3,0], size: [3, 3, 3] }, startOffset: undefined}
            );
        });
        this.simCommunicator._preInit();
        this.soundManager._preInit();
        this.editorExtras._preInit();
        this.multiplayerApi._preInit();
    };
    init = async (pml: PolyModLoader) => {
        this.editorExtras?.registerStuffCallbacks.forEach((c) => c());
        this.editorExtras?._init();

        this.multiplayerApi?.addEventListener("car_reset", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("car_update", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("end_session", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("invite_changed", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("new_session", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("players_changed", (e) => console.log(e))
        this.multiplayerApi?.addEventListener("server_message", (e) => console.log(e))
    };
    postInit = () => { };
}

export let polyMod = new PMLAPI();
