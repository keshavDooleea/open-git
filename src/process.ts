import { window, workspace } from "vscode";
import { ExecException, exec } from "child_process";

export class Process {
  static runCommand = (command: string): Promise<string> => {
    const cwd = Process.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(command, { cwd }, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(output);
      });
    });
  };

  private static getWorkingDirectory(): string | undefined {
    const fileName = window.activeTextEditor?.document.fileName;
    return workspace.workspaceFolders?.map((folder) => folder.uri.fsPath).filter((fsPath) => fileName?.startsWith(fsPath))[0];
  }
}
