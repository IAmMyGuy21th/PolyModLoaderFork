export declare function get(e?: any, t?: any, n?: any, i?: any): any;
export declare function set(e?: any, t?: any, n?: any, i?: any, r?: any): any;
export declare const ObfNames: {
    General: {
        THREE: {
            Vector3: string;
        };
        SimVector3: string;
    };
    Editor: {
        CategoriesEnum: string;
        BlocksEnum: string;
        BlockRegister: string;
        BlockMap: string;
        BlockMapInternal: string;
        CheckpointIdsRegister: string;
        StartIdsRegister: string;
        SimCheckpointIdsRegister: string;
        SimStartIdsRegister: string;
        SimCategories: string;
        SimBlocks: string;
        SimBlockRegister: string;
        SimBlockMap: string;
        BlockConfig: string;
        BlockConfigInternal: string;
        BoundType: string;
        SimBlockConfig: string;
        SimBoundType: string;
        Color: {
            Environment: string;
            EnvironmentInternal: string;
            Custom: string;
            CutomInternal: string;
            SimEnvironment: string;
            SimCustom: string;
        };
    };
    Mixins: {
        Editor: {
            IgnoreOnExportToken: string;
            BlockInitClass: string;
            BlockInitModelList: string;
            EditorBundle: string;
            EditorConstructor: string;
            EditorDispose: string;
            BlockConfigExports: string;
            EnterTrack: string;
            ExitTrack: string;
        };
        SimCom: {
            MGetPrivateSim: string;
            MSimConstructor: string;
            SMsgRcvFunc: string;
        };
        SoundManager: {
            SoundConstructor: string;
        };
        Multiplayer: {
            HostConstruct: string;
            ClientConstruct: string;
        };
    };
    SimCom: {
        IncomingData: string;
        SSimMessage: string;
    };
    SoundManager: {
        GetBufferMap: string;
    };
};
export declare enum BoundType {
    Checkpoint = 0,
    Finish = 1
}
export type ExtraSettings = {
    specialSettings: undefined | null | {
        type: BoundType;
        center: number[];
        size: number[];
    };
    ignoreOnExport: undefined | boolean;
    startOffset: {
        x: number;
        y: number;
        z: number;
    } | undefined;
};
export declare enum BlockColors {
    Environment = 0,
    Custom = 1
}
