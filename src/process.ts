import { window } from "vscode";
import { ExecException, exec } from "child_process";
import { dirname } from "path";

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

    if (!fileName) {
      throw new Error("No file within a Git repository is opened!");
    }

    return dirname(fileName);
  }
}
