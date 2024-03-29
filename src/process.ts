import { window, workspace } from "vscode";
import { ExecException, exec } from "child_process";
import { DEFAULT_BRANCH, GIT_COMMANDS, CustomError, StringUtils } from "./utils";
import { dirname } from "path";
import { VsCode } from "./vs-code";

export class Process {
  async getGitURL(): Promise<string | undefined> {
    try {
      const url = await this.runCommand(GIT_COMMANDS.remoteURL);
      return url.trim();
    } catch (err) {
      const message = CustomError.getMessage(err, "Git remote repository not found!");
      VsCode.showMessage(message);
    }
  }

  // usually equivalent to 'master' but can be 'main' or any other branch
  async getDefaultBranch(): Promise<string> {
    try {
      let grepResult = await this.runCommand(GIT_COMMANDS.defaultBranch);
      const branchName = grepResult.match(/HEAD branch: (.+)/);
      return branchName ? branchName[1].trim() : this.getShowDefaultBranch();
    } catch (err) {
      return this.getShowDefaultBranch();
    }
  }

  private getShowDefaultBranch(): string {
    VsCode.showMessage(`No default branch found: setting '${DEFAULT_BRANCH}' as branch!`);
    return DEFAULT_BRANCH;
  }

  async getCurrentBranch(): Promise<string> {
    try {
      let branch = await this.runCommand(GIT_COMMANDS.currentBranch);
      branch = StringUtils.removeNewLines(branch);
      return branch;
    } catch (err) {
      VsCode.showMessage(`Current branch is ${DEFAULT_BRANCH}`);
      return DEFAULT_BRANCH;
    }
  }

  async getDotGitPath(): Promise<string | undefined> {
    try {
      let gitPath = await this.runCommand(GIT_COMMANDS.dotGitPath);
      gitPath = StringUtils.removeNewLines(gitPath);
      return gitPath;
    } catch (err) {
      return undefined;
    }
  }

  private runCommand = (command: string): Promise<string> => {
    const cwd = this.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(command, { cwd }, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(err);
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
      throw new CustomError("No directory is opened!");
    }

    return workSpace[0].uri.fsPath;
  }

  getFileName(): string | undefined {
    return window.activeTextEditor?.document.fileName;
  }
}
