<template>
        <div class="bg-white shadow-sm rounded-sm border border-slate-200">
            
            <div class="py-3 px-4 block">
                <p class="text-base font-bold text-gray-800">
            <i :class="iconClass"></i> {{title}}
            </p>
            <div class="mb-2" v-for="(info, i) in detailObject" :key="i">
            <div class="text-gray-800 font-bold mb-1 capitalize">{{i}}:</div> 
            <span class="info-detail">{{info}}</span>
            </div>    
            </div>
        </div>
</template>

<script>
export default {
   name: "MotorClaimDetailCard",
   props: {
       detailObject: {},
       iconClass: "",
       title: ""
   },
   mounted (){
      
   }
}
</script>