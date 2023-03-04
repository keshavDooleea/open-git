import { ExtensionContext } from "vscode";
import { GitDisposable } from "./disposable";
import { Manager } from "./utils";

export function activate(context: ExtensionContext) {
  const disposable = new GitDisposable(context);

  disposable.add("open-git-dir", Manager.DIRECTORY);
  disposable.add("open-git-file-master", Manager.FILE_MASTER);
  disposable.add("open-git-file-branch", Manager.FILE_BRANCH);

  disposable.subscribe();
}

export function deactivate() {}
