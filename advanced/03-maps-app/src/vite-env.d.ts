/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_MAPBOX_ACCESS_TOKEN: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
