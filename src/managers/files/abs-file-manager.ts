import { VsCode } from "../../vs-code";
import { AbsManager } from "..";
import { StringUtils } from "../../utils";

/**
 * Opens file on master or default branch
 */
export abstract class AbsFileManager extends AbsManager {
  openGit(url: string): void {
    this.openFile(url);
  }

  protected abstract getBranch(): Promise<string>;

  // concatonate working directory url with filePath
  private async openFile(url: string): Promise<void> {
    // extract repository name from Git url
    const repositoryName = StringUtils.getLastSubString(url);

    // from the OS full path, extract only the path that follows the repository name
    const openedFile = this.process.getFileName();

    if (!openedFile || !repositoryName) {
      return VsCode.showMessage("No file is currently opened!");
    }

    // get folder/file path after repositoryName in path
    const dotGitPath = await this.process.getDotGitPath();

    if (!dotGitPath) {
      return VsCode.showMessage("Sorry, no git repository found!");
    }

    const filePath = StringUtils.formatSlashes(openedFile).split(dotGitPath)[1];

    if (!filePath) {
      return VsCode.showMessage("Sorry, this file can't be opened!");
    }

    // construct URL to file path
    const branch = await this.getBranch();
    let fileURL = `${url}/blob/${branch}${filePath}`;
    fileURL = StringUtils.formatSlashes(fileURL);

    const message = `Opened ${StringUtils.getLastSubString(fileURL)} on ${branch}`;
    VsCode.openURL(fileURL, message);
  }
}
