import { Process } from "../process";

export abstract class AbsManager {
  protected process: Process;

  constructor() {
    this.process = new Process();
  }

  getGitURL(): Promise<string | undefined> {
    return this.process.getGitURL();
  }

  private getBaseHttpsURL(repositoryURL: string): string {
    const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
    return url;
  }

  private getBaseSshURL(repositoryURL: string): string {
    if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
      throw new Error("Unknown Git repository!");
    }

    const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
    const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
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
