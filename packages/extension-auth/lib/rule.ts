export const logicRules = ['$and', '$or', '$chain', '$race'] as const;

export type LogicRule = (typeof logicRules)[number];

export function isLogicRule(rule: string): rule is LogicRule {
	return logicRules.includes(rule as LogicRule);
}
