<template>
    <div>
        <p class="text-base font-bold text-gray-800">
            <i :class="iconClass"></i> {{label}}
            </p>
            <div class="mb-2" v-for="(info, i) in item" :key="i">
            <div class="text-gray-800 font-bold mb-1 capitalize">{{i}}:</div> 
            <span class="info-detail">{{info}}</span>
            {{item}}
            </div>   
    </div>
</template>

<script>

export default {
    name: 'Details',
    props: {
        item: {},
        label: String,
        iconClass: String,
        },

        mounted() {
            console.log(this.item)
        }
}
</script>