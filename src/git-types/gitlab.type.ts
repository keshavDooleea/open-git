import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class GitlabType extends AbsGitType {
  constructor() {
    super(EGitType.gitlab);
  }

  getFilePath(url: string, branch: string, filePath: string): string {
    return this.getCommonFilePath(url, branch, filePath);
  }
}
