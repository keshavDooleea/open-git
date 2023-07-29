import { VsCode } from "../../vs-code";
import { AbsManager } from "..";
import { StringUtils } from "../../utils";
import { AbsGitType } from "../../git-types";

/**
 * Opens file on master or default branch
 */
export abstract class AbsFileManager extends AbsManager {
  protected abstract getBranch(): Promise<string>;

  // for 2 paths, given that the second path is longer that the first one, find recursively the common string from the starting position
  private findCommonPath(path1: string[], path2: string[], currPath: string = ""): string {
    // have split all elements from array 1 which is now empty
    if (path1.length === 0) {
      return currPath;
    }

    // found a match, move to the next position
    if (path1[0].toLowerCase() === path2[0].toLowerCase()) {
      path1.shift();
      currPath += path2.shift() + "/";
      return this.findCommonPath(path1, path2, currPath);
    }

    // current position is unmatch, return constructed path from beginning
    return currPath;
  }

  // concatonate working directory url with filePath
  async openGit(url: string, gitType: AbsGitType): Promise<void> {
    // extract repository name from Git url
    const repositoryName = StringUtils.getLastSubString(url);

    // from the OS full path, extract only the path that follows the repository name
    const openedFilePath = this.process.getFileName();

    if (!openedFilePath || !repositoryName) {
      return VsCode.showMessage("No file is currently opened!");
    }

    // get folder/file path after repositoryName in path
    const dotGitPath = await this.process.getDotGitPath();

    if (!dotGitPath) {
      return VsCode.showMessage("Sorry, no git repository found!");
    }

    // get match strings from .git file path and current file path
    const path1 = dotGitPath.split("/");
    const path2 = StringUtils.formatSlashes(openedFilePath).split("/");
    const commonPath = this.findCommonPath(path1, path2);

    if (!commonPath) {
      return VsCode.showMessage("Sorry, this file can't be opened!");
    }

    // construct URL to file path
    const branch = await this.getBranch();
    const filePath = StringUtils.formatSlashes(openedFilePath).split(commonPath)[1];

    let fileURL = gitType.getFilePath(url, branch, filePath);
    fileURL = StringUtils.formatSlashes(fileURL);

    const message = `Opened ${StringUtils.getLastSubString(fileURL)} on ${branch}`;
    VsCode.openURL(fileURL, message);
  }
}
