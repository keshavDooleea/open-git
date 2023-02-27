import { Process } from "./process";
import { VsCode } from "./vs-code";

export class Git {
  private readonly GIT_COMMAND = "git config --get remote.origin.url";

  constructor() {
    this.initGitURL();
  }

  private async initGitURL(): Promise<void> {
    try {
      const repositoryURL = await Process.runCommand(this.GIT_COMMAND);
      this.parseURL(repositoryURL);
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
  private parseURL(repositoryURL: string): Promise<void> | void {
    if (!repositoryURL) {
      return VsCode.showMessage("Git remote repository not found!");
    }

    // url is in https:// format
    if (repositoryURL.startsWith("http")) {
      return this.openHTTPS(repositoryURL);
    }

    // url must now be in git@github.com:user/repo.git format
    this.openSSH(repositoryURL);
  }

  private openHTTPS(repositoryURL: string): Promise<void> {
    const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
    return VsCode.openURL(url);
  }

  private openSSH(repositoryURL: string): Promise<void> | void {
    if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
      return VsCode.showMessage("Unknown Git repository!");
    }

    const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
    const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
    const url = `https://${domain}/${repositoryName}`;

    VsCode.openURL(url);
  }
}
