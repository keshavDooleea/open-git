import { EGitType } from "../utils/git-utils";

export abstract class AbsGitType {
  constructor(protected type: EGitType) {}

  abstract getDirectoryPath(url: string): string;
  abstract getComparePath(url: string, defaultBranch: string, currentBranch: string): string;
  abstract getFilePath(url: string, branch: string, filePath: string): string;

  protected getCommonFilePath(url: string, branch: string, filePath: string): string {
    return `${url}/blob/${branch}/${filePath}`;
  }

  protected getCommonComparePath(url: string, defaultBranch: string, currentBranch: string): string {
    return `${url}/compare/${defaultBranch}...${currentBranch}`;
  }
}
