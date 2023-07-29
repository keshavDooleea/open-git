import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class DevAzureType extends AbsGitType {
  constructor() {
    super(EGitType.devAzure);
  }

  // https://dev.azure.com/{organization}/{project}/_git/{repository}?path=/{pathToFile}&version=GB{branch}
  getFilePath(url: string, branch: string, filePath: string): string {
    const devAzureUrl = url.replace(/https:\/\/.*?@dev\.azure\.com/, "https://dev.azure.com"); // remove organization in between 'https' and domain.
    return `${devAzureUrl}?path=/${filePath}&version=GB${branch}`;
  }
}
