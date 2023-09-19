export interface ElectronAPI {
  togglePinWindow(): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
