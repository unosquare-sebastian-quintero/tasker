export const app = {
  windowOpen: false,
  windowPinned: false,
  toggleWindowPinned() {
    this.windowPinned = !this.windowPinned;
  },
  setWindowOpen(value: boolean) {
    this.windowOpen = value;
  },
};
