import { Process } from "../process";
import { StringUtils } from "../utils";

export abstract class AbsManager {
  protected process: Process;

  constructor() {
    this.process = new Process();
  }

  getGitURL(): Promise<string | undefined> {
    return this.process.getGitURL();
  }

  private getBaseHttpsURL(repositoryURL: string): string {
    return StringUtils.removeGitFromURL(repositoryURL);
  }

  private getBaseSshURL(repositoryURL: string): string {
    if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
      throw new Error("Unknown Git repository!");
    }

    const [gitDomain, gitRepositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]

    const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
    const repositoryName = StringUtils.removeGitFromURL(gitRepositoryName); // "user/repo.git" => "user/repo"

    const url = `https://${domain}/${repositoryName}`;

    return url;
  }

  openHTTPS(url: string): void {
    const httpsURL = this.getBaseHttpsURL(url);
    this.openGit(httpsURL);
  }

  openSSH(url: string): void {
    const sshURL = this.getBaseSshURL(url);
    this.openGit(sshURL);
  }

  protected abstract openGit(url: string): void;
}
