import { VsCode } from "../vs-code";
import { AbsManager } from ".";
import { StringUtils } from "../utils";

/**
 * Opens file on master or default branch
 */
export class FileMasterManager extends AbsManager {
  openGit(url: string): void {
    this.openFile(url);
  }

  // usually equivalent to 'master' but can be 'main' or any other branch
  protected async getCurrentBranch(): Promise<string> {
    return await this.process.getDefaultBranch();
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

    const message = `Opened ${StringUtils.getLastSubString(fileURL)} on ${branch}`;
    VsCode.openURL(fileURL, message);
  }
}
