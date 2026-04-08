/// <reference types="vite/client" />

declare module 'vite' {
  export interface Plugin {
    name: string;
    enforce?: 'pre' | 'post';
    config?: (config: any, env: any) => any;
    configResolved?: (config: any) => void;
    configureServer?: (server: any) => void;
    transform?: (code: string, id: string) => any;
  }
  
  export function defineConfig(config: any): any;
}

declare module '@vitejs/plugin-react' {
  const plugin: () => any;
  export default plugin;
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}