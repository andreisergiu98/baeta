import type { BaetaLogLevel } from './level.ts';
import type { BaetaLogMessage } from './message.ts';

export type BaetaLogTransport = (level: BaetaLogLevel, message: BaetaLogMessage) => void;
