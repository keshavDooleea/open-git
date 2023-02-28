import { ExtensionHandler, MESSAGE } from "shared";
import { window, env, Uri } from "vscode";

export class VsCodeHandler implements ExtensionHandler {
  showMessage(message: string): void {
    window.showInformationMessage(message);
  }

  async openURL(url: string): Promise<void> {
    const hasOpenedSuccessfully: boolean = await env.openExternal(Uri.parse(url));
    const message = hasOpenedSuccessfully ? MESSAGE.SUCCESS : MESSAGE.ERROR;
    this.showMessage(message);
  }
}
