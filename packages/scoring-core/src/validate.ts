import type { AnswerMap, ScaleDefinition, ScaleItem } from './types.js';

export function isItemVisible(item: ScaleItem, answers: AnswerMap): boolean {
  if (!item.visibleIf) return true;
  const val = answers[item.visibleIf.itemId];
  return val === item.visibleIf.equals;
}

export function getVisibleItems(scale: ScaleDefinition, answers: AnswerMap): ScaleItem[] {
  return scale.items.filter((item) => isItemVisible(item, answers));
}

export function validateAnswers(
  scale: ScaleDefinition,
  answers: AnswerMap
): { valid: boolean; errors: string[]; missing: string[] } {
  const errors: string[] = [];
  const missing: string[] = [];
  const visible = getVisibleItems(scale, answers);

  for (const item of visible) {
    if (item.requiresClinician) continue;
    const val = answers[item.id];
    if (val === undefined || val === null || val === '') {
      missing.push(item.id);
      continue;
    }
    if (item.inputType === 'number' && typeof val === 'number') {
      if (item.min !== undefined && val < item.min) {
        errors.push(`${item.patientPrompt}：数值不能小于 ${item.min}`);
      }
      if (item.max !== undefined && val > item.max) {
        errors.push(`${item.patientPrompt}：数值不能大于 ${item.max}`);
      }
    }
  }

  return { valid: missing.length === 0 && errors.length === 0, errors, missing };
}
