export const GIT_COMMANDS = {
  remoteURL: "git config --get remote.origin.url",
  defaultBranch: `git remote show origin | grep "HEAD branch"`,
  currentBranch: "git branch --show-current",
};

export const DEFAULT_BRANCH = "master";
