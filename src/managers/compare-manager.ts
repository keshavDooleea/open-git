import { AbsGitType } from "../git-types";
import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

/**
 * compares the default/source branch with the current/target branch
 *
 * URL format is: https://<REPO URL>/compare/<SOURCE BRANCH OR COMMIT>...<TARGET BRANCH OR COMMIT>
 * https://stackoverflow.com/a/64922402
 */
export class CompareManager extends AbsManager {
  openGit(url: string, gitType: AbsGitType): void {
    this.openCompareURL(url, gitType);
  }

  private async openCompareURL(url: string, gitType: AbsGitType): Promise<void> {
    const defaultBranch = await this.process.getDefaultBranch();
    const currentBranch = await this.process.getCurrentBranch();

    if (defaultBranch === currentBranch) {
      VsCode.showMessage("Note: Default branch and current branch are the same");
    }

    // url format
    const compareURL = gitType.getComparePath(url, defaultBranch, currentBranch);
    const message = `Opened Git repository: comparing ${defaultBranch} with ${currentBranch}`;
    VsCode.openURL(compareURL, message);
  }
}
