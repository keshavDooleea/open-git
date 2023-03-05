import { VsCode } from "../vs-code";
import { AbsManager } from "./abs-manager";

/**
 * Opens root directory
 */
export class DirectoryManager extends AbsManager {
  private readonly message = "Opened Git repository";

  openGit(url: string): void {
    VsCode.openURL(url, this.message);
  }
}
