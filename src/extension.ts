import { ExtensionContext } from "vscode";
import { GitDisposable } from "./disposable";
import { Manager } from "./managers";

export function activate(context: ExtensionContext) {
  const disposable = new GitDisposable(context);

  disposable.add("open-git-dir", Manager.DIRECTORY);
  disposable.add("open-git-file", Manager.FILE);

  disposable.subscribe();
}

export function deactivate() {}
