import { ref } from 'vue';

export const topic = ref<string>('');

export function setTopic(newTopic: string) {
  topic.value = newTopic;
}