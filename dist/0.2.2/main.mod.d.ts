import { PolyMod, PolyModLoader } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";
import { EditorExtras } from "./editorExtras";
import { SimCommunicator } from "./simCommunicator";
import { SoundManager } from "./soundManager";
import { MultiplayerApi } from "./multiplayerApi";
declare class PMLAPI extends PolyMod {
    editorExtras: EditorExtras | undefined;
    simCommunicator: SimCommunicator | undefined;
    ObfNames: {
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
    soundManager: SoundManager | undefined;
    multiplayerApi: MultiplayerApi | undefined;
    pml: PolyModLoader | undefined;
    preInit: (pml: PolyModLoader) => void;
    init: (pml: PolyModLoader) => Promise<void>;
    postInit: () => void;
}
export declare let polyMod: PMLAPI;
export {};
