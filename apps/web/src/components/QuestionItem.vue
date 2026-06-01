<template>
  <div class="question-card">
    <p class="q-index">第 {{ index }} 题</p>
    <p class="q-prompt">{{ item.patientPrompt }}</p>
    <p v-if="item.helpText" class="q-help">{{ item.helpText }}</p>
    <van-tag v-if="item.requiresClinician" type="warning" plain>建议由医护人员确认</van-tag>

    <template v-if="item.inputType === 'boolean'">
      <van-radio-group v-model="boolModel" direction="horizontal" class="q-options">
        <van-radio :name="true">是</van-radio>
        <van-radio :name="false">否</van-radio>
      </van-radio-group>
    </template>

    <template v-else-if="item.inputType === 'number'">
      <van-field
        v-model.number="numModel"
        type="digit"
        :placeholder="item.unit ? `请输入（${item.unit}）` : '请输入数值'"
      />
    </template>

    <template v-else-if="item.inputType === 'single' && item.options">
      <van-radio-group v-model="singleModel" class="q-single">
        <van-radio
          v-for="opt in item.options"
          :key="String(opt.value)"
          :name="opt.value"
        >
          {{ opt.patientLabel ?? opt.label }}
        </van-radio>
      </van-radio-group>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ScaleItem } from '@vte/scoring-core';
import type { AnswerMap } from '@vte/scoring-core';

const props = defineProps<{
  item: ScaleItem;
  index: number;
  answers: AnswerMap;
}>();

const emit = defineEmits<{
  update: [id: string, value: boolean | number | string];
}>();

const boolModel = computed({
  get: () => props.answers[props.item.id] as boolean | undefined,
  set: (v) => emit('update', props.item.id, v as boolean),
});

const numModel = computed({
  get: () => props.answers[props.item.id] as number | undefined,
  set: (v) => emit('update', props.item.id, Number(v)),
});

const singleModel = computed({
  get: () => props.answers[props.item.id],
  set: (v) => emit('update', props.item.id, v as string | number),
});
</script>

<style scoped>
.question-card {
  background: var(--color-card);
  margin: 12px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.q-index {
  font-size: 12px;
  color: var(--color-muted);
  margin: 0 0 8px;
}
.q-prompt {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px;
  line-height: 1.5;
}
.q-help {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0 0 12px;
}
.q-options {
  margin-top: 12px;
  gap: 24px;
}
.q-single {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}
</style>
