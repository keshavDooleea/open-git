(()=>{"use strict";var e={792:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Git=void 0;const s=o(518),r=o(58);t.Git=class{constructor(){this.GIT_COMMAND="git config --get remote.origin.url",this.initGitURL()}async initGitURL(){try{const e=await s.Process.runCommand(this.GIT_COMMAND);this.parseURL(e)}catch(e){console.log("Error while running command",e),r.VsCode.showMessage("Could not find Git remote repository")}}parseURL(e){if(!e)return r.VsCode.showMessage("No Git repository found");if(e.startsWith("http"))return r.VsCode.openURL(e);if(!e.includes("@")||!e.includes(":"))return r.VsCode.showMessage("Unknown Git repository");const[t,o]=e.split(":"),s=`https://${t.split("@")[1]}/${o}`;r.VsCode.openURL(s)}}},518:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Process=void 0;const s=o(496),r=o(81);class i{static getWorkingDirectory(){const e=s.window.activeTextEditor?.document.fileName;return s.workspace.workspaceFolders?.map((e=>e.uri.fsPath)).filter((t=>e?.startsWith(t)))[0]}}t.Process=i,i.runCommand=e=>{const t=i.getWorkingDirectory();return new Promise(((o,s)=>{(0,r.exec)(e,{cwd:t},((e,t)=>e?s(e):o(t)))}))}},58:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VsCode=void 0;const s=o(496);t.VsCode=class{static showMessage(e,t){s.window.showInformationMessage(e,t)}static async openURL(e){const t=await s.env.openExternal(s.Uri.parse(e))?"Opened Git repository":"An error occurred while opening repository";this.showMessage(t,{detail:e})}}},496:e=>{e.exports=require("vscode")},81:e=>{e.exports=require("child_process")}},t={};function o(s){var r=t[s];if(void 0!==r)return r.exports;var i=t[s]={exports:{}};return e[s](i,i.exports,o),i.exports}var s={};(()=>{var e=s;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=o(496),r=o(792);e.activate=function(e){let o=t.commands.registerCommand("opg.start",(()=>{new r.Git}));e.subscriptions.push(o)},e.deactivate=function(){}})(),module.exports=s})();