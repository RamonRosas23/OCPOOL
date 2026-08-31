import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const spawnOptions = {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
};

const run = (args) => new Promise((resolve) => {
  const child = spawn(npmCommand, args, spawnOptions);
  child.on('exit', (code, signal) => resolve({ code: code ?? 1, signal }));
});

const build = await run(['run', 'build']);
if (build.signal || build.code !== 0) process.exit(build.code);

const server = spawn(npmCommand, ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', '3100'], spawnOptions);
server.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
