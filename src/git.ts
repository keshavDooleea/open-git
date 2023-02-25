import { VsCode } from "./vs-code";

export class Git {
  private url: string | undefined;

  constructor() {
    this.initGitURL();
  }

  private initGitURL(): void {
    VsCode.openURL("https://github.com/keshavDooleea/");
  }
}
