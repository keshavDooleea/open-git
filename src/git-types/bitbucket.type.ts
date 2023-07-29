import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class BitbucketType extends AbsGitType {
  constructor() {
    super(EGitType.bitbucket);
  }

  getDirectoryPath(url: string): string {
    return url;
  }

  getComparePath(url: string, defaultBranch: string, currentBranch: string): string {
    return this.getCommonComparePath(url, defaultBranch, currentBranch);
  }

  getFilePath(url: string, branch: string, filePath: string): string {
    return this.getCommonFilePath(url, branch, filePath);
  }
}
