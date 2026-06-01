# 量表内容编写指南（Excel → JSON）

## 1. 推荐表格列（可用 Excel / Google Sheet 维护）

| 列名 | 说明 | 示例 |
|------|------|------|
| scale_id | 量表唯一 ID | `wells-dvt` |
| item_id | 题目 ID | `wells-dvt.cancer` |
| clinical_label | 量表原文 | 活动性癌症（近6个月…） |
| patient_prompt | 患者可见问题 | 过去6个月内，您是否因癌症… |
| help_text | 可选帮助 | 如不确定，请咨询主治医生 |
| input_type | `boolean` / `number` / `single` | boolean |
| score_true | 选「是」得分 | 1 |
| score_false | 选「否」得分 | 0 |
| requires_clinician | 是否医护填写 | FALSE |
| option_value | 单选题选项值 | 0 |
| option_label | 单选题选项文案 | 无 |
| option_points | 单选题分值 | 0 |

分级阈值另表维护：`tier_id`, `min_score`, `max_score`, `tier_label`, `patient_summary`。

## 2. 患者化原则

1. 一行评分项 → 一道封闭式问题（是/否或 0–3 单选）。
2. 避免未解释缩写；必要时在 `help_text` 写临床原话。
3. 负分项、需医师判断项设 `requires_clinician: true`。
4. 数值项注明单位与合理范围（年龄、心率、血压等）。

## 3. 导入流程

1. 临床填写 Sheet → 双人核对。
2. 开发将 Sheet 转为 `packages/scale-data/src/scales/<id>.ts`。
3. 在 `packages/scoring-core` 添加 golden test fixture。
4. 更新 [scale-inventory.md](./scale-inventory.md) 状态为 `live`。

## 4. JSON 字段对照（TypeScript）

```typescript
{
  id: 'wells-dvt.cancer',
  clinicalLabel: '...',
  patientPrompt: '...',
  helpText: '...',
  inputType: 'boolean',
  scoreWhenTrue: 1,
  scoreWhenFalse: 0,
  requiresClinician: false
}
```
