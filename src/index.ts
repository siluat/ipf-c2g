import * as yargs from "yargs";
import * as chalk from "chalk";
import * as util from "util";
import * as childProcess from "child_process";
const exec = util.promisify(childProcess.exec);

const argv = yargs
  .command(
    "$0 <repository name> [new name]",
    "CodeCommit 저장소를 Github으로 이전"
  )
  .usage("Usage: $0 <repository name> [new name]")
  .options({
    repositoryname: {
      describe: "기존 CodeCommit 저장소 이름",
    },
    newname: {
      describe: "새로 만들 Github 저장소 이름",
    },
  }).argv;

const repositoryName = argv.repositoryname as string;
const newName = (argv.newname as string) || repositoryName;
const temporaryDirectory = `${process.env.TMPDIR}${repositoryName}`;

(async function main() {
  try {
    await cloneCodeCommitRepository(repositoryName);
    await createGithubRepository(newName);
    await pushRepository(newName);
  } catch (e) {
    console.error(chalk.red(e.stderr || e));
  } finally {
    await cleanup();
  }
})();

async function cloneCodeCommitRepository(repositoryName: string) {
  const repositoryUrl = `ssh://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/${repositoryName}`;
  const command = `git clone --mirror ${repositoryUrl} ${temporaryDirectory}`;
  await runCommand(command);
}

async function createGithubRepository(repositoryName: string) {
  const command = `gh repo create ipf-dev/${repositoryName} --private -y`;
  await runCommand(command);
}

async function pushRepository(repositoryName: string) {
  const command = [
    `cd ${temporaryDirectory}`,
    ` && git push git@github.com:ipf-dev/${repositoryName}.git --all`,
    ` && git push git@github.com:ipf-dev/${repositoryName}.git --tags`,
  ].join("");
  await runCommand(command);
}

async function runCommand(command: string) {
  console.log(chalk.bold(command));
  try {
    const { stdout, stderr } = await exec(command);
    console.info(chalk.green(stdout));
    console.info(chalk.green(stderr));
  } catch (e) {
    throw new Error(e);
  }
}

async function cleanup() {
  await exec(`rm -rf ${temporaryDirectory}`);
}
