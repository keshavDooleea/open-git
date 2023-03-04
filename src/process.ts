import { window, workspace } from "vscode";
import { ExecException, exec } from "child_process";
import { dirname } from "path";
import { DEFAULT_BRANCH } from "./managers";

export class Process {
  async getGitURL(): Promise<string> {
    const command = "git config --get remote.origin.url";
    return await this.runCommand(command);
  }

  async getCurrentBranch(): Promise<string> {
    const command = "git branch --show-current";

    try {
      return await this.runCommand(command);
    } catch (err) {
      return DEFAULT_BRANCH;
    }
  }

  private runCommand = (command: string): Promise<string> => {
    const cwd = this.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(command, { cwd }, (err: ExecException | null, output: string) => {
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
