<template>
    <div class="col-span-full xl:col-span-6 bg-white rounded-sm border border-slate-200">
        <header class="px-5 py-4 border-b border-slate-100">
            <h2 class="font-semibold text-slate-800">Motor Claims</h2>
        </header>
        <div class="p-3">
            <div class="overflow-x-auto">
                <vue-tabs>
                    <v-tab v-for="(department, index) in departments" :key="index" :title="index">
                        <MotorClaimsListIndex @updateList="getClaims()" :claims="department" />
                    </v-tab>
                </vue-tabs>
            </div>
        </div>
    </div>
       
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
//you can also import this in your style tag
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
    name: "MotorClaims",
    //component code
    components: {
    VueTabs,
    VTab
    },
    data: () => {
        return {
            departments: {},
            claimsProcessor: null,
            currentClaim: null,
           
        };
    },

 
    methods: {

        activate (index) {
            this.active = index
            },
       
        async getClaims() {
            
            await this.$axios.post("admin/motor-claims").then(claims=>{
                 this.departments = {
                        "claims": [],
                        "survey": [],
                        "accounts": [],
                        "audit": [],
                    }

                    claims.data.forEach((claim, i, cl) => {
                {
                    if(!claim.stage){
                        claim.stage = 0
                        claim.department = 'claims'
                    }
                }
               
                this.departments[claim.department].push(claim);
            })
            });
            
        },
        refreshResults() {
            this.getClaims();
        },
        loadCommentsBox(id) {
        },
        
    },
    created() {
        this.getClaims();
    },

}
</script>

<style>

</style>