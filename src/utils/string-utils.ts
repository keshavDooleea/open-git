export class StringUtils {
  // removes encodings such as \n or %0A
  static removeNewLines(str: string): string {
    return str.replace(/\n|\r/g, "");
  }

  // 'test/a/b/c' returns 'c'
  static getLastSubString(url: string): string | undefined {
    return url.split("/").pop();
  }

  // replace all backward slashes with forward ones
  static formatSlashes(str: string): string {
    return str.replace(/\\/g, "/");
  }

  static removeGitFromURL(repositoryURL: string): string {
    const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
    return url;
  }
}
