import { ExtensionContext, commands } from "vscode";
import { Git } from "./git";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("opg.start", () => {
    // console.log(helloGit());
    console.log("MDOMW");
    new Git();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
