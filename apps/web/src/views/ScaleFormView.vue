<template>
  <div v-if="scale && scale.status === 'live'" class="page">
    <van-nav-bar :title="scale.name" left-arrow @click-left="onBack" fixed placeholder>
      <template #right>
        <span class="progress-text">{{ progressLabel }}</span>
      </template>
    </van-nav-bar>

    <van-progress :percentage="progressPct" stroke-width="4" class="no-print" />

    <QuestionItem
      v-for="(item, idx) in pageItems"
      :key="item.id"
      :item="item"
      :index="pageStart + idx + 1"
      :answers="answers"
      @update="onUpdate"
    />

    <div class="form-actions no-print">
      <van-button v-if="page > 0" block @click="page--">上一页</van-button>
      <van-button v-if="page < totalPages - 1" type="primary" block @click="nextPage">
        下一页
      </van-button>
      <van-button v-else type="primary" block :loading="submitting" @click="submit">
        提交并查看结果
      </van-button>
    </div>
  </div>
  <van-empty v-else description="量表不可用" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showToast } from 'vant';
import { getScaleById } from '@vte/scale-data';
import { getVisibleItems, validateAnswers } from '@vte/scoring-core';
import QuestionItem from '../components/QuestionItem.vue';
import { useAnswers } from '../composables/useAnswers';

const PAGE_SIZE = 5;
const route = useRoute();
const router = useRouter();
const scaleId = route.params.id as string;
const scale = computed(() => getScaleById(scaleId));
const { answers } = useAnswers(scaleId);

const page = ref(0);
const submitting = ref(false);

const visibleItems = computed(() =>
  scale.value ? getVisibleItems(scale.value, answers.value) : []
);

const patientItems = computed(() =>
  visibleItems.value.filter((i) => !i.requiresClinician)
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(patientItems.value.length / PAGE_SIZE))
);

const pageStart = computed(() => page.value * PAGE_SIZE);
const pageItems = computed(() =>
  patientItems.value.slice(pageStart.value, pageStart.value + PAGE_SIZE)
);

const progressPct = computed(() =>
  Math.round(((page.value + 1) / totalPages.value) * 100)
);

const progressLabel = computed(
  () => `${page.value + 1}/${totalPages.value}`
);

function onUpdate(id: string, value: boolean | number | string) {
  answers.value[id] = value;
}

function nextPage() {
  if (!scale.value) return;
  const { missing } = validateAnswers(scale.value, answers.value);
  const pageIds = new Set(pageItems.value.map((i) => i.id));
  const pageMissing = missing.filter((id) => pageIds.has(id));
  if (pageMissing.length > 0) {
    showToast('请完成本页所有题目');
    return;
  }
  page.value++;
}

function submit() {
  if (!scale.value) return;
  submitting.value = true;
  const { valid, missing } = validateAnswers(scale.value, answers.value);
  if (!valid) {
    showToast(missing.length ? '请完成所有必答题' : '请检查输入');
    submitting.value = false;
    return;
  }
  router.push({ name: 'scale-result', params: { id: scaleId } });
  submitting.value = false;
}

function onBack() {
  router.back();
}
</script>

<style scoped>
.progress-text {
  font-size: 13px;
  color: var(--color-muted);
}
.form-actions {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
