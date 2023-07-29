import { AbsGitType } from "../git-types";
import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

/**
 * Opens root directory
 */
export class DirectoryManager extends AbsManager {
  private readonly message = "Opened Git repository";

  openGit(url: string, gitType: AbsGitType): void {
    const directoryUrl = gitType.getDirectoryPath(url);
    VsCode.openURL(directoryUrl, this.message);
  }
}
