import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

/**
 * compares the default/source branch with the current/target branch
 *
 * URL format is: https://<REPO URL>/compare/<SOURCE BRANCH OR COMMIT>...<TARGET BRANCH OR COMMIT>
 * https://stackoverflow.com/a/64922402
 */
export class CompareManager extends AbsManager {
  openGit(url: string): void {
    this.openCompareURL(url);
  }

  private async openCompareURL(url: string): Promise<void> {
    const defaultBranch = await this.process.getDefaultBranch();
    const currentBranch = await this.process.getCurrentBranch();

    if (defaultBranch === currentBranch) {
      VsCode.showMessage("Note: Default branch and current branch are the same");
    }

    // url format
    const compareURL = `${url}/compare/${defaultBranch}...${currentBranch}`;

    const message = `Opened Git repository: comparing ${defaultBranch} with ${currentBranch}`;
    VsCode.openURL(compareURL, message);
  }
}
