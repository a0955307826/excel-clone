<template>
    <table class="result-data">
        <tbody>
            <tr 
                v-for="(list, index) in successData"
                :key="`table-${index}`"
            >
                <td 
                    :align="idx === 2 ? 'left' : 'center'"
                    v-for="(item, idx) in list"
                    :key="`table-content-${idx}`"
                    >{{ item }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global.js";
import { ref, watch } from "vue";
const globalStore = useGlobalStore();
const successData = ref([]);

watch(() => globalStore.successData, (newVal) => {
    successData.value = [...newVal];
    for(let i = 0; i < successData.value.length; i++) {
        successData.value[i].unshift(i + 1);
    }
})

</script>

<style scoped>
.result-data {
    @apply m-4 w-[calc(100%-32px)] bg-[#FFFFFF] whitespace-nowrap;
}

td {
    @apply border-[1px] tracking-wide border-[#666] p-2;
}
</style>