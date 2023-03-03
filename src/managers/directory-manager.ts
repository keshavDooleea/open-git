import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

export class DirectoryManager extends AbsManager {
  private readonly message = "Opened Git repository";

  openHTTPS(url: string): void {
    const httpsURL = this.getBaseHttpsURL(url);
    VsCode.openURL(httpsURL, this.message);
  }

  openSSH(url: string): void {
    const sshURL = this.getBaseSshURL(url);
    VsCode.openURL(sshURL, this.message);
  }
}
