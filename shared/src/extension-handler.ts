export interface ExtensionHandler {
  showMessage(message: string): void;
  openURL(url: string): Promise<void>;
}

export const MESSAGE = {
  SUCCESS: "Opened Git repository",
  ERROR: "An error occurred while opening repository",
};
