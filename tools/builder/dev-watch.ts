import { Event, subscribe } from '@parcel/watcher';
import style from 'ansi-styles';
import { exec } from 'child_process';
import ColorHash from 'color-hash';
import fg from 'fast-glob';
import path from 'path';

interface Options {
  ignore?: string[];
  onEvent: (ev: Event, spawn: (cmd: string) => void | Promise<void>) => void | Promise<void>;
}

interface Handler {
  dir: string;
  ignore?: string[];
  onEvent: (ev: Event, spawn: (cmd: string) => void | Promise<void>) => void | Promise<void>;
}

interface Metadata {
  name: string;
}

export function defineOptions(options: Options): Options {
  return options;
}

export function createHandler(root: string, options: Options): Handler {
  const ignore = ['node_modules/', '.turbo/', 'tsup.watch.ts', ...(options.ignore ?? [])].map(
    (item) => path.join(root, item)
  );

  return {
    dir: root,
    ignore,
    onEvent: options.onEvent,
  };
}

export function loadHandler(file: string) {
  const root = path.join(path.dirname(file), '/');
  const module = require(file) as { default: Options };
  const packageJson = require(path.join(root, 'package.json')) as Metadata;

  return {
    handler: createHandler(root, module.default),
    metadata: packageJson,
  };
}

export function createStdPrinter(metadata: Metadata, stderr = false) {
  const colorHash = new ColorHash();
  const hex = colorHash.hex(metadata.name);

  const print = stderr ? console.error : console.log;

  const printLine = (line: string) => {
    let out = line.replace('CLI', `${style.color.green.open}CLI${style.color.close}`);
    out = out.replace('ESM', `${style.color.yellow.open}ESM${style.color.close}`);
    out = out.replace('CJS', `${style.color.red.open}CJS${style.color.close}`);
    out = out.replace('DTS', `${style.color.blue.open}DTS${style.color.close}`);

    const prefix = `${style.color.ansi(style.hexToAnsi(hex))}${metadata.name}${style.color.close}`;

    print(`${prefix}: ${out}`);
  };

  let oneStdout = '';

  const onData = (data: Buffer) => {
    oneStdout += data.toString();

    const lines = oneStdout.split('\n');

    while (lines.length > 1) {
      const line = lines.shift();
      if (line) {
        printLine(line);
      }
    }

    oneStdout = lines.shift() ?? '';
  };

  const onEnd = () => {
    if (oneStdout) {
      printLine(oneStdout);
    }
  };

  return { onData, onEnd, printLine };
}

export function createSpawner(handler: Handler, metadata: Metadata) {
  return async (cmd: string) => {
    return new Promise<void>((resolve, reject) => {
      const child = exec(cmd, {
        cwd: handler.dir,
      });

      const stdOutPrinter = createStdPrinter(metadata);
      const stdErrPinter = createStdPrinter(metadata, true);

      child.stdout?.on('data', stdOutPrinter.onData);
      child.stdout?.on('end', stdOutPrinter.onEnd);
      child.stderr?.on('data', stdErrPinter.onData);
      child.stderr?.on('end', stdErrPinter.onEnd);

      child.on('close', () => {
        stdOutPrinter.printLine('DONE!');
        resolve();
      });

      child.on('error', (err) => {
        stdErrPinter.printLine(err.message);
        reject(err);
      });
    });
  };
}

export async function run() {
  const paths = process.argv.slice(2);
  const entries = await fg(paths, { onlyFiles: true });

  const results = entries.map((item) => loadHandler(path.join(process.cwd(), item)));

  console.log(
    `${style.blueBright.open}WATCHER:${style.color.close} Watching ${results.length} packages...`
  );

  await subscribe(process.cwd(), async (err, event) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    for (const fileEvent of event) {
      for (const entry of results) {
        const handler = entry.handler;
        const metadata = entry.metadata;

        if (!fileEvent.path.startsWith(handler.dir)) {
          continue;
        }

        if (handler.ignore?.some((item) => fileEvent.path.startsWith(item))) {
          continue;
        }

        console.log(
          `${style.blueBright.open}WATCHER:${style.color.close} Change in ${metadata.name} - ${fileEvent.type} - ${fileEvent.path}`
        );

        await handler.onEvent(fileEvent, createSpawner(handler, metadata));
      }
    }
  });
}
