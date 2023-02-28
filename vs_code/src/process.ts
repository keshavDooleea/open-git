import { window, workspace } from "vscode";
import { ExecException, exec } from "child_process";
import { dirname } from "path";

export class Process {
  static runCommand = (command: string): Promise<string> => {
    const cwd = Process.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(command, { cwd }, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(new Error("No directory with Git found!"));
        }
        return resolve(output);
      });
    });
  };

  private static getWorkingDirectory(): string | undefined {
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