import * as vscode from "vscode";
import { Git } from "./git";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("opg.start", () => {
    new Git();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
