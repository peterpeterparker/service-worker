export const FETCH_ROOT_KEY = import.meta.env.FETCH_ROOT_KEY;
export const PACKAGE_VERSION =  import.meta.env.PACKAGE_VERSION;
export const WORKER_SCRIPT = import.meta.env.DEV ? '/dev-sw.js?dev-sw' : '/sw.js';
export const WORKER_TYPE: WorkerType = import.meta.env.DEV ? "module" : "classic";