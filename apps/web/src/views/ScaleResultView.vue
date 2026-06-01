<template>
  <div v-if="scale && result" class="page result-page">
    <van-nav-bar :title="`${scale.name} · 结果`" fixed placeholder class="no-print">
      <template #right>
        <span class="print-title print-only">{{ scale.name }} 评估报告</span>
      </template>
    </van-nav-bar>

    <DisclaimerBanner :lines="scale.disclaimers.slice(0, 2)" />

    <van-tabs v-model:active="viewTab" class="no-print">
      <van-tab title="患者视图" name="patient" />
      <van-tab title="专业视图" name="clinician" />
    </van-tabs>

    <div v-show="viewTab === 'patient'" class="tab-panel">
      <PatientResultPanel :result="result" show-breakdown />
    </div>

    <div v-show="viewTab === 'clinician'" class="tab-panel clinician-tab">
      <div class="print-header print-only">
        <h1>{{ scale.name }}</h1>
        <p>结论：{{ result.tierLabel }} · 总分 {{ result.totalScore }}</p>
      </div>
      <PatientResultPanel :result="result" class="print-only" />
      <ClinicianResultPanel :result="result" :scale="scale" />
    </div>

    <div class="bottom-actions no-print">
      <van-button block round @click="retry">重新填写</van-button>
      <van-button type="primary" block round @click="goHome">返回量表列表</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getScaleById } from '@vte/scale-data';
import { scoreScale } from '@vte/scoring-core';
import DisclaimerBanner from '../components/DisclaimerBanner.vue';
import PatientResultPanel from '../components/PatientResultPanel.vue';
import ClinicianResultPanel from '../components/ClinicianResultPanel.vue';
import { useAnswers } from '../composables/useAnswers';

const route = useRoute();
const router = useRouter();
const scaleId = route.params.id as string;
const scale = computed(() => getScaleById(scaleId));
const { answers, clear } = useAnswers(scaleId);
const viewTab = ref<'patient' | 'clinician'>('patient');

const result = computed(() => {
  if (!scale.value) return null;
  return scoreScale(scale.value, answers.value);
});

function retry() {
  clear();
  router.replace({ name: 'scale-form', params: { id: scaleId } });
}

function goHome() {
  clear();
  router.push({ name: 'home' });
}
</script>

<style scoped>
.result-page {
  padding-bottom: 100px;
}
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 12px;
  background: var(--color-card);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.print-only {
  display: none;
}
.print-header h1 {
  font-size: 18px;
  margin: 12px;
}
@media print {
  .print-only {
    display: block !important;
  }
  .tab-panel {
    display: block !important;
  }
  .clinician-tab {
    padding: 0;
  }
}
</style>
