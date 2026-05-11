export const logicRules = ['$and', '$or', '$chain', '$race'] as const;

/** Possible logical operators that can be used in a rule */
export type LogicRule = '$and' | '$or' | '$chain' | '$race';

export function isLogicRule(rule: string): rule is LogicRule {
	return logicRules.includes(rule as LogicRule);
}
