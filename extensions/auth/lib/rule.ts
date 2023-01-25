export const grantRule = '$granted' as const;

export const logicRules = ['$and', '$or', '$chain', '$race'] as const;

export const rules = [...logicRules, grantRule] as const;

export type LogicRule = (typeof logicRules)[number];

export type GrantRule = typeof grantRule;

export type Rule = LogicRule | GrantRule;

type LogicRuleMap = Record<string, boolean | undefined>;

const logicRuleMap = logicRules.reduce<LogicRuleMap>(
  (acc, rule) => ({
    ...acc,
    [rule]: true,
  }),
  {}
);

export function isLogicRule(rule: string): rule is LogicRule {
  return logicRuleMap[rule] === true;
}

export function isGrantedRule(rule: string): rule is GrantRule {
  return rule === grantRule;
}
