export interface ElectronAPI {
  togglePinWindow(): void;
  changeIcon(): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
