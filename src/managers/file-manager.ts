import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

export class FileManager extends AbsManager {
  openHTTPS(url: string): void {
    const httpsURL = this.getBaseHttpsURL(url);
    this.openFile(httpsURL);
  }

  openSSH(url: string): void {
    const sshURL = this.getBaseSshURL(url);
    this.openFile(sshURL);
  }

  private async getCurrentBranch(): Promise<string> {
    const defaultBranch = "master";
    // Todo: read current branch
    return Promise.resolve("master") || defaultBranch;
  }

  // 'test/a/b/c' returns 'c'
  private getLastTextFromURL(url: string): string | undefined {
    return url.split("/").pop();
  }

  // concatonate working directory url with fileName
  private async openFile(url: string): Promise<void> {
    // extract repository name from Git url
    const repositoryName = this.getLastTextFromURL(url);

    // from the OS full path, extract only the path that follows the repository name
    const openedFile = this.process.getFileName();

    if (!openedFile || !repositoryName) {
      return VsCode.showMessage("No file is currently opened!");
    }

    // get folder/file path after repositoryName in path
    const fileName = openedFile.split(repositoryName)[1];

    if (!fileName) {
      return VsCode.showMessage("Sorry, this file can't be opened!");
    }

    // construct URL to file path
    const branch = await this.getCurrentBranch();
    let fileURL = `${url}/blob/${branch}${fileName}`;

    // replace all backward slashes with forward ones
    fileURL = fileURL.replace(/\\/g, "/");

    const message = `Opened ${this.getLastTextFromURL(fileURL)}`;
    VsCode.openURL(fileURL, message);
  }
}
