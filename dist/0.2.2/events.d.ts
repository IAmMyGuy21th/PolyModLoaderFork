export declare class EventDispatcher<T extends {
    [K in keyof T]: {
        type: K;
    };
}> {
    _listeners: {
        [type: string]: Function[];
    } | undefined;
    /**
     * Adds the given event listener to the given event type.
     *
     * @param {string} type - The type of event to listen to.
     * @param {Function} listener - The function that gets called when the event is fired.
     */
    addEventListener<K extends keyof T & string>(type: K, listener: (event: T[K]) => void): void;
    /**
     * Returns `true` if the given event listener has been added to the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to check.
     * @return {boolean} Whether the given event listener has been added to the given event type.
     */
    hasEventListener<K extends keyof T & string>(type: K, listener: (event: T[K]) => void): boolean;
    /**
     * Removes the given event listener from the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to remove.
     */
    removeEventListener<K extends keyof T & string>(type: K, listener: (event: T[K]) => void): void;
    /**
     * Dispatches an event object.
     *
     * @param {Object} event - The event that gets fired.
     */
    dispatchEvent<K extends keyof T & string>(event: T[K]): void;
}
export type PMLEvent = {
    type: "newsimworker";
    isRealtime: boolean;
    isMainSim: boolean;
    worker: Worker;
} | {
    type: "onmessagein";
    isRealtime: boolean;
    isMainSim: boolean;
    event: MessageEvent;
} | {
    type: "soundclassattached";
} | {
    type: "exitedtrack";
} | {
    type: "enteredtrack";
    name: string;
    author: string;
    lastModified: Date;
    isMultiplayer: boolean;
} | {
    type: "enterededitor";
    state: any;
} | {
    type: "exiteditor";
} | {
    type: "onmessageout";
    isRealtime: boolean;
    isMainSim: boolean;
    payload: any;
} | {
    type: "car_reset";
    sessionId: number;
    playerId: number;
    resetCounter: number;
} | {
    type: "car_update";
    sessionId: number;
    playerId: number;
    resetCounter: number;
    carState: any;
} | {
    type: "end_session";
} | {
    type: "new_session";
    sessionId: number;
    gameMode: number;
    trackMetadata: any;
    trackData: any;
} | {
    type: "server_message";
    msg: string;
} | {
    type: "players_changed";
    players: any;
} | {
    type: "invite_changed";
    newInvite: any;
};
