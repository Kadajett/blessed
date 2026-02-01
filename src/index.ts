/**
 * blECSd Terminal Game Library
 *
 * A modern terminal game library built on TypeScript and ECS architecture.
 *
 * @packageDocumentation
 */

// =============================================================================
// VERSION
// =============================================================================
export const VERSION = '0.0.1';

export type { Entity, System, Unsubscribe, World } from './core';
// =============================================================================
// CORE - ECS Foundation
// =============================================================================
export { createWorld, LoopPhase, resetWorld } from './core';
export type {
	ColorString,
	Dimension,
	NonNegativeInt,
	Percentage,
	PositionValue,
	PositiveInt,
} from './schemas';
// =============================================================================
// SCHEMAS - Zod Validation
// =============================================================================
export {
	ColorStringSchema,
	DimensionSchema,
	NonNegativeIntSchema,
	PercentageSchema,
	PositionValueSchema,
	PositiveIntSchema,
} from './schemas';
