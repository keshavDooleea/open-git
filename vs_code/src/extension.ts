import { Git } from "shared";
import { ExtensionContext, commands } from "vscode";
import { VsCodeHandler } from "./handler";
import { VsCodeProcess } from "./process";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("opg.start", () => {
    const handler = new VsCodeHandler();
    const process = new VsCodeProcess();
    new Git(handler, process);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
