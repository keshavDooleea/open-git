import { AbsFileManager } from "./abs-file-manager";

/**
 * Opens file on master or default branch
 */
export class FileMasterManager extends AbsFileManager {
  // usually equivalent to 'master' but can be 'main' or any other branch
  protected async getBranch(): Promise<string> {
    return await this.process.getDefaultBranch();
  }
}
