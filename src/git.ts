import { Process } from "./process";
import { VsCode } from "./vs-code";

export class Git {
  private readonly GIT_COMMAND = "git config --get remote.origin.url";

  constructor() {
    this.initGitURL();
  }

  private async initGitURL(): Promise<void> {
    try {
      const reposityURL = await Process.runCommand(this.GIT_COMMAND);
      this.parseURL(reposityURL);
    } catch (error) {
      console.log("Error while running command", error);
      VsCode.showMessage("No directory with Git found");
    }
  }

  /**
   * 2 Github URL possibilities: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories
   *  - HTTPS: https://github.com/user/repo.git
   *  - SSH  : git@github.com:user/repo.git
   */
  private parseURL(repositoryURL: string): Promise<void> | void {
    if (!repositoryURL) {
      return VsCode.showMessage("Git remote repository not found");
    }

    // url is in https:// format
    if (repositoryURL.startsWith("http")) {
      return VsCode.openURL(repositoryURL);
    }

    // url must now be in git@github.com:user/repo.git format

    if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
      return VsCode.showMessage("Unknown Git repository");
    }

    const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
    const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
    const url = `https://${domain}/${repositoryName}`;

    VsCode.openURL(url);
  }
}
