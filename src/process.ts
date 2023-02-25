import * as cp from "child_process";
import { ExecException } from "child_process";

export class Process {
  static runCommand = (command: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
      cp.exec(command, (err: ExecException | null, output: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(output);
      });
    });
}
