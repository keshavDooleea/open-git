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
const process_1 = __webpack_require__(3);
const vs_code_1 = __webpack_require__(6);
class Git {
    constructor() {
        this.GIT_COMMAND = "git config --get remote.origin.url";
        this.initGitURL();
    }
    async initGitURL() {
        try {
            const repositoryURL = await process_1.Process.runCommand(this.GIT_COMMAND);
            this.parseURL(repositoryURL);
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
    parseURL(repositoryURL) {
        if (!repositoryURL) {
            return vs_code_1.VsCode.showMessage("Git remote repository not found!");
        }
        // url is in https:// format
        if (repositoryURL.startsWith("http")) {
            return this.openHTTPS(repositoryURL);
        }
        // url must now be in git@github.com:user/repo.git format
        this.openSSH(repositoryURL);
    }
    openHTTPS(repositoryURL) {
        const [url] = repositoryURL.split(".git"); // remove .git to remove extra default encodings at the end (%0A)
        return vs_code_1.VsCode.openURL(url);
    }
    openSSH(repositoryURL) {
        if (!(repositoryURL.includes("@") && repositoryURL.includes(":"))) {
            return vs_code_1.VsCode.showMessage("Unknown Git repository!");
        }
        const [gitDomain, repositoryName] = repositoryURL.split(":"); // ["git@github.com", "user/repo.git"]
        const domain = gitDomain.split("@")[1]; // ["git", "github.com"]
        const url = `https://${domain}/${repositoryName}`;
        vs_code_1.VsCode.openURL(url);
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
    static getWorkingDirectory() {
        const fileName = vscode_1.window.activeTextEditor?.document.fileName;
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
}
exports.Process = Process;
Process.runCommand = (command) => {
    const cwd = Process.getWorkingDirectory();
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, { cwd }, (err, output) => {
            if (err) {
                return reject(new Error("No directory with Git found!"));
            }
            return resolve(output);
        });
    });
};


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
    static async openURL(url) {
        const hasOpenedSuccessfully = await vscode_1.env.openExternal(vscode_1.Uri.parse(url));
        const message = hasOpenedSuccessfully ? "Opened Git repository" : "An error occurred while opening repository";
        this.showMessage(message);
    }
}
exports.VsCode = VsCode;


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
const vscode_1 = __webpack_require__(1);
const git_1 = __webpack_require__(2);
function activate(context) {
    let disposable = vscode_1.commands.registerCommand("opg.start", () => {
        new git_1.Git();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map