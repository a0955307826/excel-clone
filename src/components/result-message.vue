<template>
    <section>
        <div class="description">
            <h1>新﹑刪可以這樣貼: (預設狀態是修改)</h1>
            <div class="copy-text">
                <p><span>新 </span>https://itrade-dev.ibfs.com.tw/dist/images/svg/借券.svg</p>
                <p><span>刪 </span>https://itrade-dev.ibfs.com.tw/dist/js_min/wls-outJarvisOrder.min.js</p>
                <p>https://itrade-dev.ibfs.com.tw/dist/images/svg/借貸.svg <span>(new)</span></p>
                <p>https://itrade-dev.ibfs.com.tw/dist/images/svg/借貸.svg <span>(del)</span></p>
            </div>
        </div>
        <div v-if="globalStore.errorData.length >= 1" class="error-message">
            <hr>
            <h2 class="error-title">以下錯誤的資料會自動被忽略:</h2>
            <p 
                v-for="(item, index) in globalStore.errorData"
                :key="`error-message-${index}`"
                >第 {{ item.order }} 筆 {{ item.error }}: {{ item.path }}
            </p>
        </div>
    </section>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global.js";
const globalStore = useGlobalStore();


</script>

<style scoped>
h1 {
    @apply text-[20px] text-[#333333] tracking-wide font-bold my-2;
}

.copy-text {
    @apply text-[18px] tracking-wide;
}

.copy-text p {
    @apply text-[18px] tracking-wide whitespace-nowrap my-2 pl-3;
}

span {
    @apply text-[#00980c];
}

hr {
    @apply block border-t-[1px] border-[#333333] my-2;
}

.error-message {
    @apply text-[#d86662];
}

h2 {
    @apply font-bold tracking-wide text-[20px];
}

.error-message p {
    @apply text-[18px] tracking-wide my-2 pl-3;
}

</style>