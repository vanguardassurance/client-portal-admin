<template>
    <div>
        <ListSearchBar  />
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="align-middle inline-block min-w-full">
                    <div class="shadow overflow-hidden">
                    <vue-tabs>
                        <v-tab v-for="(department, index) in departments" :key="index" :title="index">
                          <MotorClaimsListIndex :claims="department" />
                        </v-tab>
                    </vue-tabs>
                        
                    </div>
                </div>
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
            departments: {
                "claims": [],
                "survey": [],
                "accounts": [],
                "audit": [],
            },
            claimsProcessor: null,
            currentClaim: null,
           
        };
    },

 
    methods: {

        activate (index) {
            this.active = index
            },
       
        async getClaims() {
            let claims = await this.$axios.post("admin/motor-claims");
           
            claims.data.forEach((claim, i, cl) => {
                {
                    if(!claim.stage){
                        claim.stage = 0
                        claim.department = 'claims'
                    }
                }
                this.departments[claim.department].push(claim);
            })

            console.log(this.departments)
            
        },
        refreshResults() {
            this.getClaims();
        },
        loadCommentsBox(id) {
        },
        loadStages(id) {
        },
        loadHistory(id) {
        }
    },
    created() {
        this.getClaims();
    },
}
</script>

<style>

</style>