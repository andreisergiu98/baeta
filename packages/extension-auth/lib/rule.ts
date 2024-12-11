export const logicRules = ['$and', '$or', '$chain', '$race'] as const;

export type LogicRule = '$and' | '$or' | '$chain' | '$race';

export function isLogicRule(rule: string): rule is LogicRule {
	return logicRules.includes(rule as LogicRule);
}
