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

export function get(e?: any, t?: any, n?: any, i?: any) {
    if ("a" === n && !i)
        throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof t ? e !== t || !i : !t.has(e))
        throw new TypeError(
            "Cannot read private member from an object whose class did not declare it",
        );
    return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
}
export function set(e?: any, t?: any, n?: any, i?: any, r?: any) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !r)
        throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof t ? e !== t || !r : !t.has(e))
        throw new TypeError(
            "Cannot write private member to an object whose class did not declare it",
        );
    return ("a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n);
}

export const ObfNames = {
    General: {
        THREE: {
            Vector3: `i(4922).Pq0`,
        },
        SimVector3: `R`,
    },
    Editor: {
        CategoriesEnum: "Au.A",
        BlocksEnum: "$r.A",
        BlockRegister: "i(2600).yD",
        BlockMap: "i(2600).BlockMap",
        BlockMapInternal: "f",

        CheckpointIdsRegister: "i(2600).bK",
        StartIdsRegister: "i(2600).l1",
        SimCheckpointIdsRegister: "uo",
        SimStartIdsRegister: "fo",
        
        SimCategories: "Xa",
        SimBlocks: "Za",
        SimBlockRegister: "ho",
        SimBlockMap: "co",

        BlockConfig: "i(2600).BlockConfig",
        BlockConfigInternal: "d",
        BoundType: "i(3080).A",

        SimBlockConfig: "lo",
        SimBoundType: "to",

        Color: {
            Environment: "i(2600).Environment",
            EnvironmentInternal: "c",
            Custom: "i(2600).Custom",
            CutomInternal: "h",
            SimEnvironment: "ao",
            SimCustom: "oo",
        },
    },
    Mixins: {
        Editor: {
            IgnoreOnExportToken: `for (const r of (0, d.gn)(this, o, "f")) {`,
            BlockInitClass: `wu`,
            BlockInitModelList: `r`,
            EditorBundle: '112.bundle.js',
            EditorConstructor: `constructor(t, e, n, s, o, a, r, h, l, c, d, g, f, p, u) {`,
            EditorDispose: `(t.removeChild((0, i.gn)(this, re, "f")),`,
            BlockConfigExports: `l1: () => m, yD: () => u`,

            EnterTrack: `((p.className = "content"), f.appendChild(p));`,
            ExitTrack: `((0, R.gn)(this, si, "f").removeChild((0, R.gn)(this, hi, "f")),`,
        },
        SimCom: {
            MGetPrivateSim: `(0, r.gn)(this, h, "f")`,
            MSimConstructor: `(0, r.gn)(this, h, "f").addEventListener("message", (e)`,
            SMsgRcvFunc: `function r(i) {`,
        },
        SoundManager: {
            SoundConstructor: `if ("running" != e.state)`,
        },
        Multiplayer: {
            HostConstruct: `const s = i.getCurrentUserProfile();`,
            ClientConstruct: `(0, R.GG)(this, Ol, i, "f"),`,
        },
    },
    SimCom: {
        IncomingData: `i`,
        SSimMessage: `Ki`,
    },
    SoundManager: {
        GetBufferMap: `(0, R.gn)(this, A, "f")`,
    },
};

export enum BoundType {
    Checkpoint = 0,
    Finish = 1,
}

export type ExtraSettings = {
    specialSettings: undefined | null | { type: BoundType; center: number[]; size: number[] };
    ignoreOnExport: undefined | boolean;
    startOffset: { x: number, y: number, z: number } | undefined
};

export enum BlockColors {
    Environment,
    Custom,
}
