/**
 * Core module - ECS foundation
 * @module core
 */

export type { Entity, System, Unsubscribe, World } from './types';
export { LoopPhase } from './types';
export { createWorld, resetWorld } from './world';
