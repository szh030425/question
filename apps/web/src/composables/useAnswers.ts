import { ref, watch } from 'vue';
import type { AnswerMap } from '@vte/scoring-core';

const STORAGE_PREFIX = 'vte-answers-';

export function useAnswers(scaleId: string) {
  const key = STORAGE_PREFIX + scaleId;
  const stored = sessionStorage.getItem(key);
  const answers = ref<AnswerMap>(stored ? JSON.parse(stored) : {});

  watch(
    answers,
    (v) => {
      sessionStorage.setItem(key, JSON.stringify(v));
    },
    { deep: true }
  );

  function clear() {
    answers.value = {};
    sessionStorage.removeItem(key);
  }

  return { answers, clear };
}
