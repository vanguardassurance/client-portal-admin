<template>
    <div class="details text-sm text-gray-600">
        <p class="text-base font-bold text-gray-800">
        <i :class="iconClass"></i> {{title}}
        </p>
        <div class="mb-2" v-for="(info, i) in detailObject" :key="i">
        <div class="text-gray-800 font-bold mb-1  capitalize">{{i}}:</div> 
        <span class="info-detail">{{info}}</span>
        </div>
    </div>
</template>

<script>
export default {
   name: "ClaimDetail",
   props: {
       detailObject: {},
       iconClass: "",
       title: ""
   }
}
</script>