import { FileMasterManager } from "./file-master-manager";

/**
 * Opens file in the current branch
 */
export class FileBranchManager extends FileMasterManager {
  override async getCurrentBranch(): Promise<string> {
    return await this.process.getCurrentBranch();
  }
}
