export const grantRule = '$granted' as const;

export type GrantKey = typeof grantRule;

export function isGrantedKey(rule: string): rule is GrantKey {
  return rule === grantRule;
}
