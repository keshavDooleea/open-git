import * as vscode from "vscode";

export class VsCode {
  static showMessage(message: string): void {
    vscode.window.showInformationMessage(message);
  }

  static async openURL(url: string): Promise<void> {
    this.showMessage("Opening Git repository");
    const hasOpenedSuccessfully: boolean = await vscode.env.openExternal(vscode.Uri.parse(url));

    if (!hasOpenedSuccessfully) {
      this.showMessage("An error occurred while opening repository");
    }
  }
}
