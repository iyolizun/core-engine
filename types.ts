// types.ts
export interface EngineConfig {
  /**
   * The engine's name
   */
  name: string;
  /**
   * The engine's version
   */
  version: string;
}

export enum LogLevel {
  /**
   * Log level for debug messages
   */
  DEBUG,
  /**
   * Log level for info messages
   */
  INFO,
  /**
   * Log level for warning messages
   */
  WARN,
  /**
   * Log level for error messages
   */
  ERROR,
}

export interface EngineError {
  /**
   * The error's code
   */
  code: number;
  /**
   * The error's message
   */
  message: string;
}

export type EngineCallback = (error: EngineError | null, result: any) => void;