/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly FETCH_ROOT_KEY: boolean;
    readonly PACKAGE_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}