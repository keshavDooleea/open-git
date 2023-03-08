import { AbsFileManager } from "./abs-file-manager";

/**
 * Opens file in the current branch
 */
export class FileBranchManager extends AbsFileManager {
  override async getBranch(): Promise<string> {
    return await this.process.getCurrentBranch();
  }
}
