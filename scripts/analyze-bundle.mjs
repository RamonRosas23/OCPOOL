import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(npmCommand, ['next', 'build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, ANALYZE: 'true' },
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
