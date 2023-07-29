import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class DevAzureType extends AbsGitType {
  constructor() {
    super(EGitType.devAzure);
  }

  getDirectoryPath(url: string): string {
    // remove organization in between 'https' and domain.
    return url.replace(/https:\/\/.*?@dev\.azure\.com/, "https://dev.azure.com");
  }

  // https://dev.azure.com/{organization}/{project}/_git/{repository}/branches?baseVersion=GB{defaultBranch}&targetVersion=GB{currentBranch}
  getComparePath(url: string, defaultBranch: string, currentBranch: string): string {
    const devAzureUrl = this.getDirectoryPath(url);
    return `${devAzureUrl}/branches?baseVersion=GB${defaultBranch}&targetVersion=GB${currentBranch}`;
  }

  // https://dev.azure.com/{organization}/{project}/_git/{repository}?path=/{pathToFile}&version=GB{branch}
  getFilePath(url: string, branch: string, filePath: string): string {
    const devAzureUrl = this.getDirectoryPath(url);
    return `${devAzureUrl}?path=/${filePath}&version=GB${branch}`;
  }
}
