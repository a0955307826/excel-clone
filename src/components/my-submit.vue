<template>
    <section>
        <div v-if="verifyFormat" class="btn-wrap">
            <button @click="copyTable" class="copy btn-style">檢查無誤，複製表格</button>
            <button 
                @click="downloadExcel" 
                :style="{ 'pointer-events': isLoading ? 'none' : 'auto', 'opacity': isLoading ? '0.7' : '1' }" 
                class="download btn-style"
                v-text="submitText">
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGlobalStore } from "@/stores/global.js";
import excelJS from 'exceljs';

const globalStore = useGlobalStore();
const currentTime = ref('');
const isLoading = ref(false);
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0'); 
const hour = String(today.getHours()).padStart(2, '0'); 
const minute = String(today.getMinutes()).padStart(2, '0'); 
const second = String(today.getSeconds()).padStart(2, '0'); 

const submitText = computed(() => {
    return isLoading.value ? '下載中...' : '下載Excel';
})

currentTime.value = `${year}${month}${day}${hour}${minute}${second}`;

const downloadExcel = () => {
    isLoading.value = true;
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('上線程式清單');
    worksheet.addTable({
        name: 'tableData', 
        ref: 'A1',
        columns: [{ name:'項次' }, { name:'歸類' }, { name:'路徑' }, { name: '檔案名稱' }, { name: '內容' }],
        rows: [...globalStore.successData]
    });

    for(let i = 0; i < worksheet._rows.length; i++) {
        const row = worksheet.getRow(i + 1);
        row.alignment = { vertical: 'middle', horizontal: 'center' };
    }

    workbook.xlsx.writeBuffer().then((content) => {
        const link = document.createElement("a");
        const blobData = new Blob([content], { type: "application/vnd.ms-excel;"});
        link.download = `上線程式清單_${currentTime.value}.xlsx`;
        link.href = URL.createObjectURL(blobData);
        link.click();
        isLoading.value = false;
    });
}

const verifyFormat = computed(() => {
    return globalStore.successData.length >= 1;
})

const copyTable = () => {
    const tableData = document.querySelector('.result-data');
    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNode(tableData);
    selection.addRange(range);
    document.execCommand('copy');
    alert('表格複製完成!\r可以貼入上線清單的Excel了');
}

</script> 

<style scoped>
.btn-wrap {
    @apply flex items-center gap-[20px] mt-4;
}

.btn-style {
    @apply bg-[#666666] rounded-[10px] text-[#FFFFFF] tracking-wide font-bold px-3 py-4 duration-200 hover:bg-[#333333];
}
</style>