import * as vscode from "vscode";

export class VsCode {
  static showMessage(message: string): void {
    vscode.window.showInformationMessage(message);
  }

  static openURL(url: string): void {
    if (!url) {
      return this.showMessage("No Git repository found");
    }

    this.showMessage("Opening Git repository");
    vscode.env.openExternal(vscode.Uri.parse(url));
  }
}
