import { window, workspace } from "vscode";
import { ExecException, exec } from "child_process";
import { dirname } from "path";

export class Process {
  private readonly GIT_COMMAND = "git config --get remote.origin.url";

  runCommand = (): Promise<string> => {
    const cwd = this.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(this.GIT_COMMAND, { cwd }, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(new Error("No directory with Git found!"));
        }
        return resolve(output);
      });
    });
  };

  private getWorkingDirectory(): string | undefined {
    const fileName = this.getFileName();

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

  getFileName(): string | undefined {
    return window.activeTextEditor?.document.fileName;
  }
}
