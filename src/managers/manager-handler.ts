import { AbsManager, DirectoryManager, FileBranchManager, FileMasterManager, Manager } from "./";

// to prevent multiple new instantiations of managers
export class ManagerHandler {
  private _directoryManager: DirectoryManager | undefined;
  private _fileMasterManager: FileMasterManager | undefined;
  private _fileBranchManager: FileBranchManager | undefined;

  private initManager<T>(manager: T | undefined, instance: new () => T): T {
    if (!manager) {
      manager = new instance();
    }

    return manager;
  }

  private get directoryManager(): DirectoryManager {
    this._directoryManager = this.initManager(this._directoryManager, DirectoryManager);
    return this._directoryManager;
  }

  private get fileBranchManager(): FileBranchManager {
    this._fileBranchManager = this.initManager(this._fileBranchManager, FileBranchManager);
    return this._fileBranchManager;
  }

  private get fileMasterManager(): FileMasterManager {
    this._fileMasterManager = this.initManager(this._fileMasterManager, FileMasterManager);
    return this._fileMasterManager;
  }

  getManager(key: Manager): AbsManager {
    switch (key) {
      case Manager.DIRECTORY:
        return this.directoryManager;
      case Manager.FILE_MASTER:
        return this.fileMasterManager;
      case Manager.FILE_BRANCH:
        return this.fileBranchManager;
    }
  }
}
