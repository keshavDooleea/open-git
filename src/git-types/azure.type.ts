import { EGitType } from "../utils/git-utils";
import { AbsGitType } from "./abs-git-type";

export class AzureType extends AbsGitType {
  constructor() {
    super(EGitType.azure);
  }

  // https://dev.azure.com/{organization}/{project}/_git/{repository}?path=/{pathToFile}&version=GB{branch}
  getFilePath(url: string, branch: string, filePath: string): string {
    return `${url}?path=/${filePath}&version=GB${branch}`;
  }
}
