<template>
  <div class="result-patient">
    <div class="tier-badge" :class="tierClass">{{ result.tierLabel }}</div>
    <p v-if="result.outcomeLabel && result.outcomeLabel !== result.tierLabel" class="outcome">
      {{ result.outcomeLabel }}
    </p>
    <p class="summary">{{ result.patientSummary }}</p>
    <van-notice-bar
      v-if="result.actionHint"
      left-icon="info-o"
      :text="result.actionHint"
      wrapable
    />
    <van-collapse v-if="showBreakdown" v-model="active" class="fold">
      <van-collapse-item title="我为什么是这个结果？（简要）" name="1">
        <ul class="brief-list">
          <li v-for="line in positiveItems" :key="line.itemId">
            {{ line.patientPrompt }} → {{ line.answerDisplay }}
          </li>
          <li v-if="positiveItems.length === 0">本次无阳性条目或均为最低分级。</li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <van-notice-bar
      v-for="(w, i) in result.warnings"
      :key="i"
      color="#ed6a0c"
      background="#fffbe8"
      :text="w"
      wrapable
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ScaleResult } from '@vte/scoring-core';

const props = defineProps<{
  result: ScaleResult;
  showBreakdown?: boolean;
}>();

const active = ref<string[]>([]);

const tierClass = computed(() => {
  const id = props.result.tierId;
  if (id.includes('high') || id.includes('stage3') || id === 'massive' || id === 'not_excluded')
    return 'tier-high';
  if (id.includes('moderate') || id.includes('stage2') || id === 'submassive') return 'tier-mid';
  return 'tier-low';
});

const positiveItems = computed(() =>
  props.result.breakdown.filter((b) => !b.skipped && b.points !== 0)
);
</script>

<style scoped>
.result-patient {
  padding: 12px;
}
.tier-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}
.tier-low {
  background: #e8f8f0;
  color: #07c160;
}
.tier-mid {
  background: #fff7e8;
  color: #ed6a0c;
}
.tier-high {
  background: #ffecec;
  color: #ee0a24;
}
.summary {
  font-size: 15px;
  line-height: 1.6;
  margin: 12px 0;
}
.outcome {
  color: var(--color-muted);
  font-size: 14px;
}
.brief-list {
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.6;
}
.fold {
  margin: 12px 0;
}
</style>
