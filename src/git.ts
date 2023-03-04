import { AbsManager } from "./managers";

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
      return;
    }

    // url is in https:// format
    if (repositoryURL.startsWith("http")) {
      return this.manager.openHTTPS(repositoryURL);
    }

    // url must now be in git@github.com:user/repo.git format
    this.manager.openSSH(repositoryURL);
  }
}
