import { spawn } from 'node:child_process';
import process from 'node:process';

function start(label, command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    ...options,
  });

  child.stdout.on('data', (chunk) => {
    process.stdout.write(`[${label}] ${chunk}`);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(`[${label}] ${chunk}`);
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`[${label}] exited with signal ${signal}`);
    } else {
      console.log(`[${label}] exited with code ${code}`);
    }
    process.exitCode = code ?? 1;
    shutdown();
  });

  return child;
}

const backend = start('backend', 'php', ['-S', 'localhost:8000', '-t', 'php-backend/public', 'php-backend/public/index.php']);
const frontend = start('frontend', 'node', ['frontend/node_modules/next/dist/bin/next', 'dev', '-H', 'localhost', '-p', '3000']);

const children = [backend, frontend];
let shuttingDown = false;

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(130);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(143);
});
