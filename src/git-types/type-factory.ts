import { AbsGitType } from "./abs-git-type";
import { AzureType } from "./azure.type";
import { BitbucketType } from "./bitbucket.type";
import { GithubType } from "./github.type";
import { GitlabType } from "./gitlab.type";

export class GitTypeFactory {
  static getType(repositoryURL: string): AbsGitType {
    const url = repositoryURL.toLowerCase();

    if (url.includes("gitlab")) {
      return new GitlabType();
    }

    if (url.includes("bitbucket")) {
      return new BitbucketType();
    }

    if (url.includes("azure")) {
      return new AzureType();
    }

    return new GithubType();
  }
}
