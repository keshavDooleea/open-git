import { Process } from "../process";
import { VsCode } from "../vs-code";

export abstract class AbsManager {
  protected process: Process;

  constructor() {
    this.process = new Process();
  }

  runCommand(): Promise<string> {
    return this.process.runCommand();
  }

  protected getBaseHttpsURL(repositoryURL: string): string {
    const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
    return url;
  }

  protected getBaseSshURL(repositoryURL: string): string {
    if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
      throw new Error("Unknown Git repository!");
    }

    const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
    const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
    const url = `https://${domain}/${repositoryName}`;

    return url;
  }

  protected openURL(url: string, message: string): void {
    VsCode.openURL(url, message);
  }

  abstract openHTTPS(url: string): void;
  abstract openSSH(url: string): void;
}
