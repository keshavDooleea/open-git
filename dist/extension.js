/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Git = void 0;
const vs_code_1 = __webpack_require__(6);
class Git {
    setManager(manager) {
        this.manager = manager;
    }
    async init(manager) {
        this.setManager(manager);
        this.parseURL();
    }
    async parseURL() {
        try {
            const repositoryURL = await this.manager.runCommand();
            this.openURL(repositoryURL);
        }
        catch (err) {
            const error = err;
            console.log("Error while running command", error);
            vs_code_1.VsCode.showMessage(error.message);
        }
    }
    /**
     * 2 Github URL possibilities: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories
     *  - HTTPS: https://github.com/user/repo.git
     *  - SSH  : git@github.com:user/repo.git
     */
    openURL(repositoryURL) {
        if (!repositoryURL) {
            return vs_code_1.VsCode.showMessage("Git remote repository not found!");
        }
        // url is in https:// format
        if (repositoryURL.startsWith("http")) {
            return this.manager.openHTTPS(repositoryURL);
        }
        // url must now be in git@github.com:user/repo.git format
        this.manager.openSSH(repositoryURL);
    }
}
exports.Git = Git;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Process = void 0;
const vscode_1 = __webpack_require__(1);
const child_process_1 = __webpack_require__(4);
const path_1 = __webpack_require__(5);
class Process {
    constructor() {
        this.GIT_COMMAND = "git config --get remote.origin.url";
        this.runCommand = () => {
            const cwd = this.getWorkingDirectory();
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)(this.GIT_COMMAND, { cwd }, (err, output) => {
                    if (err) {
                        return reject(new Error("No directory with Git found!"));
                    }
                    return resolve(output);
                });
            });
        };
    }
    getWorkingDirectory() {
        const fileName = this.getFileName();
        // a file is opened, return its working directory
        if (fileName) {
            return (0, path_1.dirname)(fileName);
        }
        // no file is opened in the editor, so get opened workspace
        const workSpace = vscode_1.workspace.workspaceFolders;
        // empty sidebar, no workspace opened
        if (!workSpace || workSpace.length === 0) {
            throw new Error("No directory opened!");
        }
        return workSpace[0].uri.fsPath;
    }
    getFileName() {
        return vscode_1.window.activeTextEditor?.document.fileName;
    }
}
exports.Process = Process;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VsCode = void 0;
const vscode_1 = __webpack_require__(1);
class VsCode {
    static showMessage(message) {
        vscode_1.window.showInformationMessage(message);
    }
    static async openURL(url, successMessage) {
        const hasOpenedSuccessfully = await vscode_1.env.openExternal(vscode_1.Uri.parse(url));
        const message = hasOpenedSuccessfully ? successMessage : "An error occurred while opening repository";
        this.showMessage(message);
    }
}
exports.VsCode = VsCode;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManagerHandler = exports.Manager = void 0;
const _1 = __webpack_require__(14);
var Manager;
(function (Manager) {
    Manager[Manager["DIRECTORY"] = 0] = "DIRECTORY";
    Manager[Manager["FILE"] = 1] = "FILE";
})(Manager = exports.Manager || (exports.Manager = {}));
// to prevent multiple new instantiations of managers
class ManagerHandler {
    get directoryManager() {
        if (!this._directoryManager) {
            this._directoryManager = new _1.DirectoryManager();
        }
        return this._directoryManager;
    }
    get fileManager() {
        if (!this._fileManager) {
            this._fileManager = new _1.FileManager();
        }
        return this._fileManager;
    }
    getManager(key) {
        switch (key) {
            case Manager.DIRECTORY:
                return this.directoryManager;
            case Manager.FILE:
                return this.fileManager;
        }
    }
}
exports.ManagerHandler = ManagerHandler;


/***/ }),
/* 8 */,
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitDisposable = void 0;
const vscode_1 = __webpack_require__(1);
const managers_1 = __webpack_require__(14);
const git_1 = __webpack_require__(2);
class GitDisposable {
    constructor(context) {
        this.context = context;
        this.disposables = [];
        this.git = new git_1.Git();
        this.managerHandler = new managers_1.ManagerHandler();
    }
    add(command, managerKey) {
        const cmd = vscode_1.commands.registerCommand(command, () => {
            const manager = this.managerHandler.getManager(managerKey);
            this.git.init(manager);
        });
        this.disposables.push(cmd);
    }
    subscribe() {
        this.disposables.forEach((disposable) => this.context.subscriptions.push(disposable));
    }
}
exports.GitDisposable = GitDisposable;


/***/ }),
/* 10 */,
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectoryManager = void 0;
const vs_code_1 = __webpack_require__(6);
const abs_manager_1 = __webpack_require__(12);
class DirectoryManager extends abs_manager_1.AbsManager {
    constructor() {
        super(...arguments);
        this.message = "Opened Git repository";
    }
    openHTTPS(url) {
        const httpsURL = this.getBaseHttpsURL(url);
        vs_code_1.VsCode.openURL(httpsURL, this.message);
    }
    openSSH(url) {
        const sshURL = this.getBaseSshURL(url);
        vs_code_1.VsCode.openURL(sshURL, this.message);
    }
}
exports.DirectoryManager = DirectoryManager;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbsManager = void 0;
const process_1 = __webpack_require__(3);
const vs_code_1 = __webpack_require__(6);
class AbsManager {
    constructor() {
        this.process = new process_1.Process();
    }
    runCommand() {
        return this.process.runCommand();
    }
    getBaseHttpsURL(repositoryURL) {
        const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
        return url;
    }
    getBaseSshURL(repositoryURL) {
        if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
            throw new Error("Unknown Git repository!");
        }
        const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
        const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
        const url = `https://${domain}/${repositoryName}`;
        return url;
    }
    openURL(url, message) {
        vs_code_1.VsCode.openURL(url, message);
    }
}
exports.AbsManager = AbsManager;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileManager = void 0;
const vs_code_1 = __webpack_require__(6);
const abs_manager_1 = __webpack_require__(12);
class FileManager extends abs_manager_1.AbsManager {
    openHTTPS(url) {
        const httpsURL = this.getBaseHttpsURL(url);
        this.openFile(httpsURL);
    }
    openSSH(url) {
        const sshURL = this.getBaseSshURL(url);
        this.openFile(sshURL);
    }
    async getCurrentBranch() {
        const defaultBranch = "master";
        // Todo: read current branch
        return Promise.resolve("master") || defaultBranch;
    }
    // 'test/a/b/c' returns 'c'
    getLastTextFromURL(url) {
        return url.split("/").pop();
    }
    // concatonate working directory url with fileName
    async openFile(url) {
        // extract repository name from Git url
        const repositoryName = this.getLastTextFromURL(url);
        // from the OS full path, extract only the path that follows the repository name
        const openedFile = this.process.getFileName();
        if (!openedFile || !repositoryName) {
            return vs_code_1.VsCode.showMessage("No file is currently opened!");
        }
        // get folder/file path after repositoryName in path
        const fileName = openedFile.split(repositoryName)[1];
        if (!fileName) {
            return vs_code_1.VsCode.showMessage("Sorry, this file can't be opened!");
        }
        // construct URL to file path
        const branch = await this.getCurrentBranch();
        let fileURL = `${url}/blob/${branch}${fileName}`;
        // replace all backward slashes with forward ones
        fileURL = fileURL.replace(/\\/g, "/");
        const message = `Opened ${this.getLastTextFromURL(fileURL)}`;
        vs_code_1.VsCode.openURL(fileURL, message);
    }
}
exports.FileManager = FileManager;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileManager = exports.DirectoryManager = exports.Manager = exports.ManagerHandler = exports.AbsManager = void 0;
const abs_manager_1 = __webpack_require__(12);
Object.defineProperty(exports, "AbsManager", ({ enumerable: true, get: function () { return abs_manager_1.AbsManager; } }));
const manager_handler_1 = __webpack_require__(7);
Object.defineProperty(exports, "ManagerHandler", ({ enumerable: true, get: function () { return manager_handler_1.ManagerHandler; } }));
Object.defineProperty(exports, "Manager", ({ enumerable: true, get: function () { return manager_handler_1.Manager; } }));
const directory_manager_1 = __webpack_require__(11);
Object.defineProperty(exports, "DirectoryManager", ({ enumerable: true, get: function () { return directory_manager_1.DirectoryManager; } }));
const file_manager_1 = __webpack_require__(13);
Object.defineProperty(exports, "FileManager", ({ enumerable: true, get: function () { return file_manager_1.FileManager; } }));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const disposable_1 = __webpack_require__(9);
const managers_1 = __webpack_require__(14);
function activate(context) {
    const disposable = new disposable_1.GitDisposable(context);
    disposable.add("open-git-dir", managers_1.Manager.DIRECTORY);
    disposable.add("open-git-file", managers_1.Manager.FILE);
    disposable.subscribe();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map