import { ConsoleLogger, LogLevel } from '@nestjs/common';

/**
 * Log levels for configuration
 */
export const LOG_LEVELS: Record<string, LogLevel[]> = {
  debug: ['debug', 'verbose', 'log', 'warn', 'error'],
  info: ['log', 'warn', 'error'],
  warn: ['warn', 'error'],
  error: ['error'],
};

/**
 * Get log levels from environment
 */
export const getLogLevels = (): LogLevel[] => {
  const level = process.env.LOG_LEVEL || 'info';
  return LOG_LEVELS[level] || LOG_LEVELS.info;
};

/**
 * Custom application logger with enhanced formatting
 */
export class AppLogger extends ConsoleLogger {
  private static instance: AppLogger;

  constructor(context?: string) {
    super(context || 'Application');
    this.setLogLevels(getLogLevels());
  }

  /**
   * Get singleton instance
   */
  static getInstance(context?: string): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger(context);
    }
    if (context) {
      AppLogger.instance.setContext(context);
    }
    return AppLogger.instance;
  }

  /**
   * Log startup banner
   */
  logStartup(config: { port: number; env: string; apiPrefix: string }): void {
    const { port, env, apiPrefix } = config;
    const isDev = env === 'development';

    console.log('\n');
    console.log(
      '╔════════════════════════════════════════════════════════════╗'
    );
    console.log(
      '║                                                            ║'
    );
    console.log(
      '║   ⚡ SPECTRE CHAT SERVER                                   ║'
    );
    console.log(
      '║                                                            ║'
    );
    console.log(
      '╠════════════════════════════════════════════════════════════╣'
    );
    console.log(
      `║   🌐 Server:     http://localhost:${port.toString().padEnd(25)}║`
    );
    console.log(
      `║   📚 Swagger:    http://localhost:${port}/docs${' '.repeat(17)}║`
    );
    console.log(
      `║   🔧 API:        /${apiPrefix}${' '.repeat(37 - apiPrefix.length)}║`
    );
    console.log(`║   🏷️  Mode:       ${env.padEnd(40)}║`);
    console.log(
      '║                                                            ║'
    );
    if (isDev) {
      console.log(
        '║   ⚠️  Running in development mode                          ║'
      );
    } else {
      console.log(
        '║   ✅ Running in production mode                            ║'
      );
    }
    console.log(
      '║                                                            ║'
    );
    console.log(
      '╚════════════════════════════════════════════════════════════╝'
    );
    console.log('\n');
  }

  /**
   * Log with structured data
   */
  logWithMeta(
    message: string,
    meta?: Record<string, unknown>,
    context?: string
  ): void {
    const ctx = context || this.context;
    if (meta && Object.keys(meta).length > 0) {
      super.log(`${message} ${JSON.stringify(meta)}`, ctx);
    } else {
      super.log(message, ctx);
    }
  }

  /**
   * Log error with stack trace
   */
  errorWithStack(message: string, error?: Error, context?: string): void {
    const ctx = context || this.context;
    if (error?.stack) {
      super.error(`${message}\n${error.stack}`, ctx);
    } else {
      super.error(message, ctx);
    }
  }
}

/**
 * Create a module-specific logger
 */
export const createLogger = (context: string): AppLogger => {
  return new AppLogger(context);
};

/**
 * Default application logger
 */
export const appLogger = new AppLogger('Application');
