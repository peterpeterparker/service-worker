export const FETCH_ROOT_KEY = import.meta.env.FETCH_ROOT_KEY;
export const PACKAGE_VERSION =  import.meta.env.PACKAGE_VERSION;
export const HOST =  import.meta.env.VITE_HOST;
export const DEV = import.meta.env.DEV;
export const WORKER_SCRIPT = DEV ? '/dev-sw.js?dev-sw' : '/sw.js';
export const WORKER_TYPE: WorkerType = DEV ? "module" : "classic";