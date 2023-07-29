export const GIT_COMMANDS = {
  remoteURL: "git config --get remote.origin.url",
  defaultBranch: `git remote show origin | findstr "HEAD branch"`,
  currentBranch: "git branch --show-current",
  dotGitPath: "git rev-parse --show-toplevel",
};

export const DEFAULT_BRANCH = "master";

export enum EGitType {
  github,
  gitlab,
  bitbucket,
  devAzure,
}
