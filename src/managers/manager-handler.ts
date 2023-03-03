import { AbsManager, DirectoryManager, FileManager } from "./";

export enum Manager {
  DIRECTORY,
  FILE,
}

// to prevent multiple new instantiations of managers
export class ManagerHandler {
  private _directoryManager: DirectoryManager | undefined;
  private _fileManager: FileManager | undefined;

  get directoryManager(): DirectoryManager {
    if (!this._directoryManager) {
      this._directoryManager = new DirectoryManager();
    }

    return this._directoryManager;
  }

  get fileManager(): FileManager {
    if (!this._fileManager) {
      this._fileManager = new FileManager();
    }

    return this._fileManager;
  }

  getManager(key: Manager): AbsManager {
    switch (key) {
      case Manager.DIRECTORY:
        return this.directoryManager;
      case Manager.FILE:
        return this.fileManager;
    }
  }
}
