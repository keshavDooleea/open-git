import { window, env, Uri } from "vscode";

export class VsCode {
  static showMessage(message: string): void {
    window.showInformationMessage(message);
  }

  static async openURL(url: string, successMessage: string): Promise<void> {
    const hasOpenedSuccessfully: boolean = await env.openExternal(Uri.parse(url));
    const message = hasOpenedSuccessfully ? successMessage : "An error occurred while opening repository";
    this.showMessage(message);
  }
}
