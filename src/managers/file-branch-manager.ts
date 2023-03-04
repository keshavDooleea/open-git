import { StringUtils } from "../utils";
import { FileMasterManager } from "./file-master-manager";

/**
 * Opens file in the current branch
 */
export class FileBranchManager extends FileMasterManager {
  override async getCurrentBranch(): Promise<string> {
    let branch = await this.process.getCurrentBranch();
    branch = StringUtils.removeNewLines(branch);

    return branch;
  }
}
