import { LoadRemoteModuleOptions } from "@angular-architects/module-federation";

export type FederationPlugin = LoadRemoteModuleOptions & {
    displayName?: string;
    routePath?: string;
    moduleName?: string;
    moduleClassName?: string;
    componentClassName?: string;
    serviceClassName?: string;
    exposedComponent?: string;
    navigationAlias?: string;
    type?: "angular" | "react" | "vue";
    subType?: "component" | "componentModule" | "routeModule";
};
