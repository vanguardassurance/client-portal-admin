<template>
<div class="">
    <div class="details text-sm text-gray-600 block">
      
        <table class="table">
        <tbody>
        <tr><td class="text-base font-bold text-gray-800">
        <i :class="iconClass"></i> {{title}}
        </td></tr>
        <tr class="flex flex-row justify-content-left" v-for="(info, i) in detailObject" :key="i">
            <td class="text-gray-800 font-bold">{{i}}:</td> 
            <td class="info-detail ml-5">{{info}}</td>
        </tr>
        </tbody>
        </table>
    </div>
</div>
    
</template>

<script>
export default {
   name: "ClaimDetailRows",
   props: {
       detailObject: null,
       iconClass: "",
       title: ""
   },
}
</script>