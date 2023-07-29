import { GitTypeFactory } from "./git-types";
import { AbsManager } from "./managers";
import { VsCode } from "./vs-code";

export class Git {
  private manager!: AbsManager;

  async init(manager: AbsManager): Promise<void> {
    this.setManager(manager);
    this.parseURL();
  }

  private setManager(manager: AbsManager): void {
    this.manager = manager;
  }

  private async parseURL(): Promise<void> {
    const repositoryURL = await this.manager.getGitURL();
    this.openURL(repositoryURL);
  }

  /**
   * 2 Github URL possibilities: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories
   *  - HTTPS: https://github.com/user/repo.git
   *  - SSH  : git@github.com:user/repo.git
   */
  private openURL(repositoryURL: string | undefined): Promise<void> | void {
    if (!repositoryURL) {
      VsCode.showMessage("No repository URL found!");
      return;
    }

    const gitType = GitTypeFactory.getType(repositoryURL);

    // url is in https:// format
    if (repositoryURL.startsWith("http")) {
      return this.manager.openHTTPS(repositoryURL, gitType);
    }

    // url must now be in git@github.com:user/repo.git format
    this.manager.openSSH(repositoryURL, gitType);
  }
}
