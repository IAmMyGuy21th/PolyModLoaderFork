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

import { PolyModLoader, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { PMLEvent, EventDispatcher } from "./events";
import { ObfNames } from "./obfuscation";


type SoundManagerEventMap = {
    soundclassattached: Extract<PMLEvent, { type: "soundclassattached" }>
};

export class SoundManager extends EventDispatcher<SoundManagerEventMap> {
    soundClass: any = null;
    buffers: any;
    soundOverrides: { [key: string]: string[] } = {};
    pml: PolyModLoader;
    constructor(pml: PolyModLoader) {
        super();
        this.pml = pml;
    }
    _preInit() {
        this.pml.registerGlobalMixin({
            type: MixinType.REPLACEBETWEEN,
            tokenStart: `${ObfNames.Mixins.SoundManager.SoundConstructor}`,
            tokenEnd: `${ObfNames.Mixins.SoundManager.SoundConstructor}`,
            func: `polyModLoader.getMod("pmlapi").soundManager.buffers = ${ObfNames.SoundManager.GetBufferMap};${ObfNames.Mixins.SoundManager.SoundConstructor}
                   polyModLoader.getMod("pmlapi").soundManager.soundClass = this;
                   polyModLoader.getMod("pmlapi").soundManager.dispatchEvent({ type: "soundclassattached" })
                   `,
        });
    }
    getBuffer(e: string) {
        return this.soundClass.getBuffer(e);
    }
    _loadFromUrls(urls: string[], callback: (buffer: AudioBuffer | null) => void): void {
        const i: AudioContext = this.soundClass.context;
        console.log(i, urls)
        if (null == i) callback(null);
        else if (0 == urls.length) callback(null);
        else {
            const r = urls[0],
                a = new XMLHttpRequest();
            a.open("GET", r, !0);
            a.responseType = "arraybuffer";
            a.onload = () => {
                i.decodeAudioData(a.response)
                    .then((e) => {
                        callback(e);
                    })
                    .catch(() => {
                        this._loadFromUrls.call(this, urls.slice(1), callback);
                    });
            }
            a.send();
        }
    }
    overrideImmediate(id: string, newid: string) {
        this.buffers.set(id, this.buffers.get(newid));
    }
    load(id: string, urls: string[]) {
        this._loadFromUrls(urls, (buffer) => {
            console.log(buffer)
            null == buffer
                ? (console.warn('Audio "' + id + '" failed to load'),
                    this.buffers.set(id, null))
                : this.buffers.set(id, buffer);
        });
    }
    playUIClick() {
        this.soundClass.playUIClick();
    }
    // TODO: Check that this works
    playSound(id: string, gain: number = 1, start: number = 0) {
        const e = this.getBuffer("click");
        if (
        null != e &&
        null != this.soundClass.context &&
        null != this.soundClass.destinationSfx
        ) {
        const t = this.soundClass.context.createBufferSource();
        t.buffer = e;
        const n = this.soundClass.context.createGain();
        ((n.gain.value = 0.0075),
            t.connect(n),
            n.connect(this.soundClass.destinationSfx),
            t.start(start));
        }
    }
}