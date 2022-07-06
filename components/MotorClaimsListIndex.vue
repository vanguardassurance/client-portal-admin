<template>
    <div>
        <table class="table-fixed min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="p-4">
                                        <div class="flex items-center">
                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded">
                                            <label for="checkbox-all" class="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Customer  
                                    </th>
                                    <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Policy
                                    </th>
                                    <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                
                                <tr v-for="claim in claims" :key="claim._id" class="hover:bg-gray-100">
                                    <td class="p-2 w-4">
                                        <div class="flex items-center">
                                            <input id="checkbox-claims" aria-describedby="checkbox-1" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded">
                                            <label for="checkbox-claims" class="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap text-sm font-normal text-gray-500">
                                        <div class="text-sm font-semibold text-gray-900">{{claim.policy_info.owner.name}}</div>
                                        <div class="text-xs font-normal text-gray-500">{{claim.policy_info.owner.contact}}</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap text-base font-medium text-gray-900">
                                        <div class="text-sm font-semibold text-gray-900">{{claim.policy_info.policy_number}}</div>
                                        <div class="text-xs font-normal text-gray-500">{{claim.policy_info.vehicle.registration}} {{claim.accident_details.date}}</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap text-base text-center font-medium text-gray-900">
                                        <div class="text-sm font-normal text-gray-900">{{claim.status}}</div>
                                        <div class="text-xs font-normal text-gray-500" v-if="claim.department">{{claim.department}} - {{claim.stage}}</div>
                                        <div class="text-xs font-normal text-gray-500" v-else>Claims</div>
                                    </td>
                                    
                                    <td class="p-2 whitespace-nowrap space-x-2text-right ">
                                        <MotorClaimListActions @updateSuccessfull="updateList()" recordType="motor_claim" :linkToView="true" :item="claim" :stagesControlButtons="true" stagesType="motor_claim" :linkPrepend="linkPrepend" :id="claim._id" />
                                    </td>
                                </tr>                
                            </tbody>
                        </table>
                </div>
</template>


<script>
import MotorClaimListActions from './MotorClaimListActions.vue'


export default {
    name: "MotorClaimsListIndex",
    props: {
        claims: []
    },
    data: () => {
        return {
          // linkPrepend: "motor/",
           linkPrepend: "motor/"
        };
    },
    created() {
        this.loadStages();
    },
    methods: {
        loadStages() {
            this.$axios.post("admin/motor-claim-stages", { stage_parent: "motor_claim" })
                .then(stages => {
                this.stages = stages.data;
            });
        },
        
        updateStage(claim) {
            this.$axios.post("admin/motor-claim-update-stage", { previous: claim.stage, current: this.stage, current_department: this.stages[this.stage], previous_department: this.stages[claim.stage], comment: this.comment, type: "motor_claim", direction: this.direction, claim_id: this.id })
                .then(data => {
                this.getClaim();
                this.toggleStagesModal();
            });
        },
        toggleStagesModal(id = null) {
            this.stagesModal = !this.stagesModal;
            this.id = id;
        },
        toggleHistoryModal() {
            this.historyModal = !this.historyModal;
        },

        updateList(){
            this.$emit('updateList');
        }
    },
    components: { MotorClaimListActions }
}

</script>