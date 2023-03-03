import { commands, Disposable, ExtensionContext } from "vscode";
import { Manager, ManagerHandler } from "./managers";
import { Git } from "./git";

export class GitDisposable {
  private disposables: Disposable[];
  private git: Git;
  private managerHandler: ManagerHandler;

  constructor(private context: ExtensionContext) {
    this.disposables = [];
    this.git = new Git();
    this.managerHandler = new ManagerHandler();
  }

  add(command: string, managerKey: Manager): void {
    const cmd = commands.registerCommand(command, () => {
      const manager = this.managerHandler.getManager(managerKey);
      this.git.init(manager);
    });

    this.disposables.push(cmd);
  }

  subscribe(): void {
    this.disposables.forEach((disposable) => this.context.subscriptions.push(disposable));
  }
}
