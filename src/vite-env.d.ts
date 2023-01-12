/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly FETCH_ROOT_KEY: boolean;
    readonly PACKAGE_VERSION: string;
    readonly VITE_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}