import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class BitbucketType extends AbsGitType {
  constructor() {
    super(EGitType.bitbucket);
  }

  getFilePath(url: string, branch: string, filePath: string): string {
    return this.getCommonFilePath(url, branch, filePath);
  }
}
