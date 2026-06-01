import type { ScaleDefinition } from '@vte/scoring-core';

export const GLOBAL_DISCLAIMERS = [
  '本工具仅根据公开量表规则进行计算，不能替代医师的临床判断与个体化评估。',
  '部分条目需实验室或影像检查，患者自评结果可能不完整。',
  '如出现胸痛、呼吸困难、晕厥等急症症状，请立即就医或拨打急救电话。',
];

type ScaleInput = Omit<ScaleDefinition, 'disclaimers' | 'status' | 'type'> &
  Partial<Pick<ScaleDefinition, 'status' | 'type'>> & {
    disclaimers?: string[];
  };

export function baseScale(partial: ScaleInput): ScaleDefinition {
  const { disclaimers: extra, status, type, ...rest } = partial;
  return {
    status: status ?? 'live',
    type: type ?? 'additive',
    disclaimers: [...GLOBAL_DISCLAIMERS, ...(extra ?? [])],
    ...rest,
  };
}
