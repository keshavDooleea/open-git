import { EGitType } from "../utils/git-utils";

export abstract class AbsGitType {
  constructor(protected type: EGitType) {}

  abstract getFilePath(url: string, branch: string, filePath: string): string;

  protected getCommonFilePath(url: string, branch: string, filePath: string): string {
    return `${url}/blob/${branch}/${filePath}`;
  }
}
