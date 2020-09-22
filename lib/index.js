"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var chalk = require("chalk");
var util = require("util");
var childProcess = require("child_process");
var exec = util.promisify(childProcess.exec);
var argv = yargs
    .command("$0 <repository name> [new name]", "CodeCommit 저장소를 Github으로 이전")
    .usage("Usage: $0 <repository name> [new name]")
    .options({
    repositoryname: {
        describe: "기존 CodeCommit 저장소 이름",
    },
    newname: {
        describe: "새로 만들 Github 저장소 이름",
    },
}).argv;
var repositoryName = argv.repositoryname;
var newName = argv.newname || repositoryName;
var temporaryDirectory = "" + process.env.TMPDIR + repositoryName;
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    return [4 /*yield*/, cloneCodeCommitRepository(repositoryName)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createGithubRepository(newName)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, pushRepository(newName)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    e_1 = _a.sent();
                    console.error(chalk.red(e_1.stderr || e_1));
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, cleanup()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
})();
function cloneCodeCommitRepository(repositoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var repositoryUrl, command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repositoryUrl = "ssh://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/" + repositoryName;
                    command = "git clone --mirror " + repositoryUrl + " " + temporaryDirectory;
                    return [4 /*yield*/, runCommand(command)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createGithubRepository(repositoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    command = "gh repo create ipf-dev/" + repositoryName + " --private -y";
                    return [4 /*yield*/, runCommand(command)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function pushRepository(repositoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    command = [
                        "cd " + temporaryDirectory,
                        " && git push git@github.com:ipf-dev/" + repositoryName + ".git --all",
                        " && git push git@github.com:ipf-dev/" + repositoryName + ".git --tags",
                    ].join("");
                    return [4 /*yield*/, runCommand(command)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, stdout, stderr, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(chalk.bold(command));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exec(command)];
                case 2:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    console.info(chalk.green(stdout));
                    console.info(chalk.green(stderr));
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    throw new Error(e_2);
                case 4: return [2 /*return*/];
            }
        });
    });
}
function cleanup() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec("rm -rf " + temporaryDirectory)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
