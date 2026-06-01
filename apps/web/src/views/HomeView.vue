<template>
  <div class="page">
    <van-nav-bar title="VTE 医疗问卷" fixed placeholder class="no-print" />

    <DisclaimerBanner :lines="globalDisclaimers" />

    <van-search
      v-model="keyword"
      placeholder="搜索量表名称"
      class="no-print"
    />

    <van-tabs v-model:active="activeTab" sticky offset-top="46" class="no-print">
      <van-tab title="全部" name="all" />
      <van-tab v-for="cat in categories" :key="cat.id" :title="cat.label" :name="cat.id" />
    </van-tabs>

    <div class="scale-list">
      <van-empty v-if="filtered.length === 0" description="未找到量表" />
      <van-card
        v-for="scale in filtered"
        :key="scale.id"
        :title="scale.name"
        :desc="scale.scenario"
        @click="goScale(scale.id)"
      >
        <template #tags>
          <van-tag type="primary" plain>{{ scale.categoryLabel }}</van-tag>
          <van-tag v-if="scale.status === 'live'" type="success">可用</van-tag>
          <van-tag v-else-if="scale.status === 'placeholder'" type="default">敬请期待</van-tag>
          <van-tag v-else type="warning">待完善</van-tag>
          <van-tag v-if="scale.needsLab" type="warning" plain>需检验</van-tag>
        </template>
        <template #footer>
          <span class="meta">{{ scale.estimatedItems ? `约 ${scale.estimatedItems} 题` : '' }}</span>
        </template>
      </van-card>
    </div>

    <p class="footer-note no-print">本系统采用 PDF 汇编标准版 · 2026</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { allScales, CATEGORY_LABELS, GLOBAL_DISCLAIMERS } from '@vte/scale-data';
import DisclaimerBanner from '../components/DisclaimerBanner.vue';

const router = useRouter();
const keyword = ref('');
const activeTab = ref('all');

const globalDisclaimers = GLOBAL_DISCLAIMERS;

const categories = computed(() =>
  Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }))
);

const filtered = computed(() => {
  let list = allScales;
  if (activeTab.value !== 'all') {
    list = list.filter((s) => s.category === activeTab.value);
  }
  const kw = keyword.value.trim().toLowerCase();
  if (kw) {
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(kw) ||
        s.id.includes(kw) ||
        s.scenario.includes(kw)
    );
  }
  const order = { live: 0, pending: 1, placeholder: 2 };
  return [...list].sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));
});

function goScale(id: string) {
  router.push({ name: 'scale-intro', params: { id } });
}
</script>

<style scoped>
.scale-list {
  padding: 0 8px 24px;
}
.meta {
  font-size: 12px;
  color: var(--color-muted);
}
.footer-note {
  text-align: center;
  font-size: 12px;
  color: var(--color-muted);
  padding: 16px;
}
</style>
