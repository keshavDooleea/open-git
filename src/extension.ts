import { ExtensionContext, commands } from "vscode";
import { Git } from "./git";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("opg.start", () => {
    new Git();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
