import { window, env, Uri, MessageOptions } from "vscode";

export class VsCode {
  static showMessage(message: string, options?: MessageOptions): void {
    window.showInformationMessage(message, options!);
  }

  static async openURL(url: string): Promise<void> {
    const hasOpenedSuccessfully: boolean = await env.openExternal(Uri.parse(url));
    const message = hasOpenedSuccessfully ? "Opened Git repository" : "An error occurred while opening repository";
    this.showMessage(message, { detail: url });
  }
}
