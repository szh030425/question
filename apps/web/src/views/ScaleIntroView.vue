<template>
  <div v-if="scale" class="page">
    <van-nav-bar :title="scale.name" left-arrow @click-left="router.back()" fixed placeholder />

    <DisclaimerBanner :lines="scale.disclaimers" />

    <van-cell-group inset>
      <van-cell title="适用场景" :label="scale.scenario" />
      <van-cell title="说明" :label="scale.description" />
      <van-cell v-if="scale.reference" title="文献" :label="`${scale.reference}${scale.year ? ' (' + scale.year + ')' : ''}`" />
      <van-cell v-if="scale.estimatedItems" title="题数" :value="`约 ${scale.estimatedItems} 题`" />
    </van-cell-group>

    <van-notice-bar
      v-if="scale.eligibility?.notes"
      wrapable
      :text="scale.eligibility.notes"
    />

    <van-field
      v-if="scale.eligibility?.gender"
      v-model="genderConfirm"
      label="性别确认"
      readonly
      is-link
      placeholder="请选择"
      @click="showGenderPicker = true"
    />

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker
        :columns="genderColumns"
        @confirm="onGenderConfirm"
        @cancel="showGenderPicker = false"
      />
    </van-popup>

    <div v-if="scale.status !== 'live'" class="placeholder-msg">
      <van-empty :description="scale.description" />
    </div>

    <div v-else class="actions no-print">
      <van-button type="primary" block round size="large" @click="start">
        开始填写
      </van-button>
    </div>
  </div>
  <van-empty v-else description="未找到该量表" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showToast } from 'vant';
import { getScaleById } from '@vte/scale-data';
import DisclaimerBanner from '../components/DisclaimerBanner.vue';

const route = useRoute();
const router = useRouter();
const scale = computed(() => getScaleById(route.params.id as string));

const genderConfirm = ref('');
const showGenderPicker = ref(false);
const genderColumns = [
  { text: '女', value: 'female' },
  { text: '男', value: 'male' },
];

function onGenderConfirm({ selectedOptions }: { selectedOptions: { value: string }[] }) {
  genderConfirm.value = selectedOptions[0].value === 'female' ? '女' : '男';
  showGenderPicker.value = false;
}

function start() {
  const s = scale.value;
  if (!s || s.status !== 'live') return;
  if (s.eligibility?.gender) {
    const required = s.eligibility.gender;
    const selected = genderConfirm.value === '女' ? 'female' : genderConfirm.value === '男' ? 'male' : '';
    if (!selected) {
      showToast('请先确认性别');
      return;
    }
    if (selected !== required) {
      showToast(`本量表仅适用于${required === 'female' ? '女性' : '男性'}患者`);
      return;
    }
  }
  router.push({ name: 'scale-form', params: { id: s.id } });
}
</script>

<style scoped>
.actions {
  padding: 24px 16px;
}
.placeholder-msg {
  padding: 24px;
}
</style>
