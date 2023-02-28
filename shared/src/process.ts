import { ExecException, exec } from "child_process";

export abstract class Process {
  runCommand = (command: string): Promise<string> => {
    const cwd = this.getWorkingDirectory();

    return new Promise<string>((resolve, reject) => {
      exec(command, { cwd }, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(new Error("No directory with Git found!"));
        }
        return resolve(output);
      });
    });
  };

  protected abstract getWorkingDirectory(): string | undefined;
}
