import { AbsManager } from "./managers";
import { VsCode } from "./vs-code";

export class Git {
  private manager!: AbsManager;

  private setManager(manager: AbsManager): void {
    this.manager = manager;
  }

  async init(manager: AbsManager): Promise<void> {
    this.setManager(manager);
    this.parseURL();
  }

  private async parseURL(): Promise<void> {
    try {
      const repositoryURL = await this.manager.runCommand();
      this.openURL(repositoryURL);
    } catch (err) {
      const error = err as Error;
      console.log("Error while running command", error);
      VsCode.showMessage(error.message);
    }
  }

  /**
   * 2 Github URL possibilities: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories
   *  - HTTPS: https://github.com/user/repo.git
   *  - SSH  : git@github.com:user/repo.git
   */
  private openURL(repositoryURL: string): Promise<void> | void {
    if (!repositoryURL) {
      return VsCode.showMessage("Git remote repository not found!");
    }

    // url is in https:// format
    if (repositoryURL.startsWith("http")) {
      return this.manager.openHTTPS(repositoryURL);
    }

    // url must now be in git@github.com:user/repo.git format
    this.manager.openSSH(repositoryURL);
  }
}
