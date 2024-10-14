<template>
    <textarea 
        v-model.trim="myInput" 
        class="myInput" 
        placeholder="貼上程式清單">
    </textarea>
</template>

<script setup>
import { ref, watch } from "vue";
import { useGlobalStore } from "@/stores/global.js";

const globalStore = useGlobalStore();
const state = ref("");
const myInput = ref("");
const myInputFormatData = ref([]);
const enumPathPrefix = ref({
    IWEB: "iweb-dev/source$/",
    SSL: "https://",
    Z: "z:/"
})

const enumSystem =  ref([
    {
        name: '證券 ibfs', id: 'ibfs',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\www.wls.com.tw\\',
        devDomain: 'www-dev.ibfs.com.tw',
        devSource: 'www_wls_com_tw',

    },
    {
        name: '期貨 ibff', id: 'ibff',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\www.wlf.com.tw\\',
        devDomain: 'www-dev.ibff.com.tw',
        devSource: 'www_wlf_com_tw',
    },
    {
        name: '投顧 ibfic', id: 'ibfic',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\www.wls-consulting.com.tw\\',
        devDomain: 'www-dev.ibfic.com.tw',
        devSource: 'www_wls-consulting_com_tw',
    },
    {
        name: 'css後台', id: 'css',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\css.wls.com.tw\\',
        devDomain: 'css-dev.ibfs.com.tw',
        devSource: 'css_wls_com_tw',
    },
    {
        name: '模擬專區', id: 'gametrade',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\gameTrade.wls.com.tw\\',
        devDomain: 'gameTrade-dev.ibfs.com.tw',
        devSource: 'gameTrade_wls_com_tw',
    },
    {
        name: 'gateway', id: 'gateway',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\gateway.wls.com.tw\\',
        devDomain: 'gateway-dev.ibfs.com.tw',
        devSource: 'gateway_wls_com_tw',
    },

    {
        name: 'igateway', id: 'igateway',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\gateway.wls.com.tw\\',
        devDomain: 'igateway-dev.ibfs.com.tw',
        devSource: 'gateway_wls_com_tw',
    },
    {
        name: '國票Web', id: 'itrade',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\itrade.wls.com.tw\\',
        devDomain: 'itrade-dev.ibfs.com.tw',
        devSource: 'itrade_wls_com_tw',
    },
    {
        name: '金融友善', id: 'friendly',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\friendly.ibfs.com.tw\\',
        devDomain: 'friendly-dev.ibfs.com.tw',
        devSource: 'friendly_ibfs_com_tw',
    },
    {
        name: 'DL', id: 'dl',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\dl.wls.com.tw\\',
        devDomain: 'dl-dev.ibfs.com.tw',
        devSource: 'dl_wls_com_tw',
    },
    {
        name: 'app', id: 'app',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\app.ibfs.com.tw\\',
        devDomain: 'app-dev.ibfs.com.tw',
        devSource: 'app_ibfs_com_tw',
    },
    {
        name: 'eCounter', id: 'eCounter',
        prodPath: 'C:\\PUBLIC\\WWWROOT\\eCounter.ibfs.com.tw\\',
        devDomain: 'eCounter-dev.ibfs.com.tw',
        devSource: 'eCounter_ibfs_com_tw',
    },
]);

const findDevSourceAndReplace = (path) => {
    const findEnumSystem = enumSystem.value.find(item => path.includes(item?.devDomain));
    const replaceState = resultFilename(path);

    if(replaceState.split("http://")[0]) {
        return;
    }

    let urlObject = new URL(replaceState);
    let hostname = urlObject.hostname;
    let href = urlObject.href;

    if(findEnumSystem) {
        return href.replace(hostname, findEnumSystem?.devSource.toLocaleLowerCase().replace(/_/g, '.'));
    }

    return href.replace(hostname, hostname.replace(/_/g, '.'));
}

const splitPath = (path) => {
    return path.split('\\').filter(Boolean).join('/');
}

const replacePrefixFormat = (prefix, path) => {
    return path.replace(prefix, 'http://').replace(/\/sourcecode/gi, '');
};

const replaceFilenameFormat = (name) => {
    if (name.includes('?')) {
        name = name.split('?')[0];
    } 
    if (name.includes(' ')) {
        name = name.split(' ')[0];
    }
    return name;
}

const resultState = (path) => {
    let toLowerCasePath = path.toLowerCase();
    state.value = '修改';
    if(toLowerCasePath.includes('新') || toLowerCasePath.includes('(new)')) {
        state.value = '新增';
    }
    if(toLowerCasePath.includes('刪') || toLowerCasePath.includes('(del)')) {
        state.value = '刪除';
    }
    return state.value;
}

const resultFilename = (name) => {
    name = name.replace(/^\(del\)|\(del\)$/gi, '').replace(/^\(new\)|\(new\)$/gi, '').replace(/^新|新$/g, '').replace(/^刪|刪$/g, '').replace(/^修改|修改$/g, '');
    return name;
}

const resultFormat = () => {
    const successFormat = [];
    const errorFormat = [];

    myInputFormatData.value.forEach((item, index) => {
        let saveOldFormat = item;
        let path = item.replace(/\s+/g, "").replace(/"/g, '');
        let filename = "";
        let findEnumSystem;
        let pathSplit = splitPath(path);
        resultState(path);

        if(pathSplit?.toLowerCase()?.includes(enumPathPrefix.value.IWEB)) {
            if(pathSplit?.toLowerCase().includes('/iweb-dev')) {
                path = replacePrefixFormat(/\/iweb-dev\/Source\$\//i, pathSplit);
            } else {
                path = replacePrefixFormat(/iweb-dev\/Source\$\//i, pathSplit);
            }
            path = findDevSourceAndReplace(path);
        }

        if(pathSplit?.toLowerCase()?.includes(enumPathPrefix.value.Z)) {
            path = replacePrefixFormat(/z:\//gi, pathSplit);
            path = findDevSourceAndReplace(path);
        }

        if(path?.includes(enumPathPrefix.value.SSL)) {
            path = resultFilename(path);
            path = replacePrefixFormat(enumPathPrefix.value.SSL, path);
            findEnumSystem = enumSystem.value.find(item => path.includes(item.devDomain));
            if(findEnumSystem?.devDomain) {
                path = path.replace(findEnumSystem.devDomain, findEnumSystem.devSource.replace(/_/g, '.'));
            }
        }

        if(path?.includes("http://")) {
            path = path.split("http://")[1].split("/");
            filename = replaceFilenameFormat(path.splice(path.length - 1, 1)[0]);
            path = `C:\\PUBLIC\\WWWROOT\\${path.join("\\")}`;
        }


        if(!filename?.includes(".") || !filename.split(".")[1]) {
            return errorFormat.push({order: index + 1, error: "檔名不正確", path: saveOldFormat});
        } 

        successFormat.push([state.value, path, filename]);
    });

    globalStore.successData = successFormat;
    globalStore.errorData = errorFormat;
};

watch(myInput, (newVal) => {  
    try {
        myInputFormatData.value = newVal.replace(/\t/g, '').split("\n").filter(Boolean);
        console.log(myInputFormatData.value);
        resultFormat();
    } catch (error) {
        console.log(error);
    }
});

</script>

<style scoped>
.myInput {
    @apply w-full h-[200px] outline-none border-[#666] border-[1px] p-2;
}

.myInput:focus {
    @apply border-[#333333] border-2;
}

</style>
