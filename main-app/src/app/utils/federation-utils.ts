import { LoadRemoteModuleOptions } from "@angular-architects/module-federation";

type Scope = unknown;
type Factory = () => unknown;

interface Container {
    init: (shareScope: Scope, initScope?: Scope) => void;
    get: (module: string, getScope?: Scope) => Factory;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __webpack_share_scopes__: { default: Scope; plugin: Scope };

const moduleMap = {};

export function loadRemoteEntry(remoteEntry: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (moduleMap[remoteEntry]) {
            resolve(moduleMap[remoteEntry]);
            return;
        }

        const script = document.createElement("script");
        script.src = remoteEntry;

        script.addEventListener("error", reject);

        script.addEventListener("load", () => {
            moduleMap[remoteEntry] = true;
            resolve(moduleMap[remoteEntry]); // window is the global namespace
        });

        document.body.append(script);
    });
}

async function lookupExposedRemote<T>(remoteName: string, exposedModule: string): Promise<T> {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[remoteName] as Container;

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await container.init(__webpack_share_scopes__.default);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const factory = await container.get(exposedModule);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Module = factory();
    return Module as T;
}

export async function loadRemoteModule(options: LoadRemoteModuleOptions): Promise<any> {
    await loadRemoteEntry(options.remoteEntry);
    return lookupExposedRemote<unknown>(options.remoteName, options.exposedModule);
}
