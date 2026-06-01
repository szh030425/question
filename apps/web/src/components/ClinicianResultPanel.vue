<template>
  <div class="result-clinician print-section">
    <van-cell-group inset title="计分明细">
      <table class="breakdown-table">
        <thead>
          <tr>
            <th>临床条目</th>
            <th>回答</th>
            <th>分值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in result.breakdown" :key="row.itemId">
            <td>{{ row.clinicalLabel }}</td>
            <td>{{ row.answerDisplay }}</td>
            <td class="points">{{ formatPoints(row.points) }}</td>
          </tr>
        </tbody>
        <tfoot v-if="showTotal">
          <tr>
            <td colspan="2"><strong>总分</strong></td>
            <td class="points"><strong>{{ formatPoints(result.totalScore) }}</strong></td>
          </tr>
        </tfoot>
      </table>
    </van-cell-group>

    <van-cell-group v-if="scale?.formulaNote" inset title="计分说明">
      <van-cell :title="scale.formulaNote" />
    </van-cell-group>

    <van-cell-group inset title="分级标准">
      <van-cell
        v-for="tier in scale?.tiers ?? []"
        :key="tier.id"
        :title="tier.label"
        :label="tierRange(tier)"
      >
        <template #value>
          <span :class="{ 'tier-active': tier.id === result.tierId }">
            {{ tier.id === result.tierId ? '◀ 当前' : '' }}
          </span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="scale" inset title="文献">
      <van-cell :title="scale.reference" :label="scale.year ? `年份 ${scale.year}` : ''" />
      <van-cell title="适用场景" :label="scale.scenario" />
    </van-cell-group>

    <p v-if="result.clinicianNote" class="clinician-note">
      临床注释：{{ result.clinicianNote }}
    </p>

    <div class="no-print actions">
      <van-button type="primary" block @click="copyReport">复制专业报告</van-button>
      <van-button plain block class="mt" @click="printPage">打印 / 导出 PDF</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import type { ScaleDefinition, ScaleResult, ScaleTier } from '@vte/scoring-core';

const props = defineProps<{
  result: ScaleResult;
  scale?: ScaleDefinition;
  showTotal?: boolean;
}>();

const showTotal =
  props.showTotal ?? (props.scale?.type === 'additive' || props.scale?.type === 'tiered');

function formatPoints(p: number): string {
  return Number.isInteger(p) ? String(p) : p.toFixed(1);
}

function tierRange(tier: ScaleTier): string {
  const min = tier.minScore;
  const max = tier.maxScore;
  if (min !== undefined && max !== undefined) return `${min} – ${max} 分`;
  if (min !== undefined) return `≥ ${min} 分`;
  if (max !== undefined) return `≤ ${max} 分`;
  return tier.patientSummary;
}

function buildMarkdown(): string {
  const s = props.scale;
  const r = props.result;
  let md = `# ${s?.name ?? r.scaleId} 评估报告\n\n`;
  md += `**结论**：${r.tierLabel}\n`;
  if (showTotal) md += `**总分**：${r.totalScore}\n\n`;
  md += `## 明细\n| 条目 | 回答 | 分值 |\n|---|---|---|\n`;
  for (const row of r.breakdown) {
    md += `| ${row.clinicalLabel} | ${row.answerDisplay} | ${formatPoints(row.points)} |\n`;
  }
  if (s?.reference) md += `\n**文献**：${s.reference}\n`;
  return md;
}

async function copyReport() {
  try {
    await navigator.clipboard.writeText(buildMarkdown());
    showToast('已复制到剪贴板');
  } catch {
    showToast('复制失败，请手动选择内容');
  }
}

function printPage() {
  window.print();
}
</script>

<style scoped>
.breakdown-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.breakdown-table th,
.breakdown-table td {
  border: 1px solid #ebedf0;
  padding: 8px;
  text-align: left;
  vertical-align: top;
}
.breakdown-table th {
  background: #f7f8fa;
}
.points {
  text-align: center;
  white-space: nowrap;
}
.tier-active {
  color: var(--color-primary);
  font-weight: 600;
}
.clinician-note {
  margin: 12px;
  font-size: 13px;
  color: #646566;
}
.actions {
  padding: 12px;
}
.mt {
  margin-top: 8px;
}
@media print {
  .breakdown-table {
    font-size: 11px;
  }
}
</style>
