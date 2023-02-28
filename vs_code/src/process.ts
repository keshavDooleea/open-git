import { window, workspace } from "vscode";
import { dirname } from "path";
import { Process } from "shared";

export class VsCodeProcess extends Process {
  protected getWorkingDirectory(): string | undefined {
    const fileName = window.activeTextEditor?.document.fileName;

    // a file is opened, return its working directory
    if (fileName) {
      return dirname(fileName);
    }

    // no file is opened in the editor, so get opened workspace
    const workSpace = workspace.workspaceFolders;

    // empty sidebar, no workspace opened
    if (!workSpace || workSpace.length === 0) {
      throw new Error("No directory opened!");
    }

    return workSpace[0].uri.fsPath;
  }
}
