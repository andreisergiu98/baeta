type GlobalConsoleLog = {
  console: ConsoleLogger;
};

type ConsoleLogger = {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
};

function hasConsoleLog(global: Record<string, unknown>): global is GlobalConsoleLog {
  return global.console != null;
}

function createLogger(): ConsoleLogger {
  const global = globalThis;

  if (!hasConsoleLog(global)) {
    return {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    };
  }

  return {
    debug: (...args: any[]) => global.console.debug('[baeta:debug]', ...args),
    info: (...args: any[]) => global.console.info('[baeta:info]', ...args),
    warn: (...args: any[]) => global.console.warn('[baeta:warn]', ...args),
    error: (...args: any[]) => global.console.error('[baeta:error]', ...args),
  };
}

export const log = createLogger();
