import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
	const successData = ref([]);
	const errorData = ref([]);

	return { successData, errorData };
});
