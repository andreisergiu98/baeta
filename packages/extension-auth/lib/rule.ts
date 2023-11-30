export const logicRules = ['$and', '$or', '$chain', '$race'] as const;

export type LogicRule = (typeof logicRules)[number];

type LogicRuleMap = Record<string, boolean | undefined>;

const logicRuleMap: LogicRuleMap = {};

for (const rule of logicRules) {
  logicRuleMap[rule] = true;
}

export function isLogicRule(rule: string): rule is LogicRule {
  return logicRuleMap[rule] === true;
}
