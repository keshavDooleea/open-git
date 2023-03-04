import { VsCode } from "../vs-code";
import { AbsManager, DEFAULT_BRANCH } from ".";
import { StringUtils } from "../utils";

/**
 * Opens file on master branch
 */
export class FileMasterManager extends AbsManager {
  openHTTPS(url: string): void {
    const httpsURL = this.getBaseHttpsURL(url);
    this.openFile(httpsURL);
  }

  openSSH(url: string): void {
    const sshURL = this.getBaseSshURL(url);
    this.openFile(sshURL);
  }

  protected async getCurrentBranch(): Promise<string> {
    return DEFAULT_BRANCH;
  }

  // concatonate working directory url with fileName
  private async openFile(url: string): Promise<void> {
    // extract repository name from Git url
    const repositoryName = StringUtils.getLastSubString(url);

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
    fileURL = StringUtils.formatSlashes(fileURL);

    const message = `Opened ${StringUtils.getLastSubString(fileName)} on ${branch}`;
    VsCode.openURL(fileURL, message);
  }
}
