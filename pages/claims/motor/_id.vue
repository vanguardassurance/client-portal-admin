<template>
    <div class="pt-6 mt-10 px-4 h-full pb-10">
        <div class="relative bg-indigo-100 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
            <div>
                <h1 class=" text-slate-800 font-bold mb-1">
                Policy #:  {{policy_info.policy_number}} 
                </h1>
                <p class=" text-gray-600">Date filed: {{claim.created_at | formatDate}}</p>
               
                <div class="float-right text-sm xs:float-left ">
                 <MotorClaimListActions @updateSuccessfull="getClaim()" :driverOption="true" recordType="motor_claim" :enabledNotifier="true" :item="claim" :stagesControlButtons="true" :linkToView="false" stagesType="motor_claim" linkPrepend="motor/" :id="claim_id" />
                 <div class="mt2"><span class="font-bold"> Status:</span> {{claim.status}}</div>
                 <div class="mt2"><span class="font-bold"> Department:</span> {{claim.department}}</div>
                </div>
                 </div>
        </div>
       <div class="grid grid-cols-12 gap-6">
            <div class="flex flex-col col-span-full sm:col-span-6 md:col-span-6 gap-3 mb-3 ">
                <MotorClaimDetailCard :detailObject="owner_info" title="Owner Details" iconClass="fa fa-solid fa-address-card" />
            </div>
            <div class="flex flex-col col-span-full sm:col-span-6 md:col-span-6 gap-3 mb-3 ">
                <MotorClaimDetailCard :detailObject="policy_info.vehicle" title="Vehicle Details" iconClass="fa fa-solid fa-car-side"  />
                <div class="p-2 sm:p-4 lg:p-10 lg:pt-0 sm:justify-center pt-0">
                <MotorClaimListActions  :driverOption="true" recordType="motor_claim" :enabledNotifier="true" :item="claim" :stagesControlButtons="true" :linkToView="false" stagesType="motor_claim" linkPrepend="motor/" :id="claim_id" />
            
            </div>

            </div>
       </div>

      

          <div class="grid grid-cols-12 gap-6 bg-white shadow-sm rounded-sm border border-slate-200 mb-3">
            <!--div-- class="col-span-full sm:col-span-12 md:col-span-6  gap-3 mb-3 py-3 px-4 block ">
                <ClaimDetail :detailObject="driver" title="Drivers" iconClass="fa fa-solid fa-steering-wheel" />
            </!--div-->
             <div class="col-span-full sm:col-span-12 md:col-span-6 gap-3 mb-3 py-3 px-4 block">
                <ClaimDetail v-if="third_party != 'no'" :detailObject="third_party" title="Third Party Details" iconClass="fa fa-solid fa-user" />
                <div v-else>  
                <p class="text-base font-bold text-gray-800">
                    <i class="fa fa-solid fa-user"></i> Third Party Details
                </p>
                <div class="mb-2">
                    <div class="text-gray-800 font-bold mb-1  capitalize">N B:</div> 
                    <span class="info-detail">No Third party vehicles were involved.</span>
                </div>
            </div>
            </div>
            <div class="col-span-full sm:col-span-12 lg:col-span-4 md:col-span-4 gap-3 mb-3 py-3 px-4 block">
                <ClaimDetail :detailObject="accident_details" title="Accident Details" iconClass="fa fa-solid fa-car-bump" />
            </div>
        </div>

          <div class="grid grid-cols-12 gap-6 bg-white shadow-sm rounded-sm border border-slate-200 mb-3">
             <!--div class="col-span-full sm:col-span-12 lg:col-span-4 md:col-span-4 gap-3 mb-3 py-3 px-4 block">
                <ClaimDetail :detailObject="accident_details" title="Accident Details" iconClass="fa fa-solid fa-car-bump" />
            </div-->
            <div class="col-span-full sm:col-span-12 lg:col-span-4 md:col-span-4 gap-3 mb-3 py-3 px-4 block">
                <p class="text-base font-bold text-gray-800">
                    <i class="fa fas fa-first-aid"></i> Casualties
                </p>
                <div class="mb-2" v-if="casualtiesFound">
                <ul>
                    <li v-for="(casualty, i) in claim.casualty_damage" :key="i" class="mb-3">
                    <div class="mb-1">{{i}}. {{casualty.name}}</div>
                    <div class="text-xs text-gray-500">{{casualty.contact}}</div>
                    <div class="text-sm">{{casualty.comment}}</div>
                    </li>
                </ul>
                    <span class="info-detail"></span>
                </div>
                 <div class="mb-2" v-else>
                    No casualties found. 
                 </div>
            </div>

            <div class="col-span-full sm:col-span-12 lg:col-span-4 md:col-span-4 gap-3 mb-3 py-3 px-4 block">
                <p class="text-base font-bold text-gray-800">
                    <i class="fa fa-solid fa-user"></i> Witnesses
                </p>
                <div class="mb-2" v-if="witnessesFound">
                <ul>
                    <li v-for="(witness, i) in claim.witness" :key="i">
                    {{i}}. {{witness.name}} - {{witness.contact}}
                    </li>
                </ul>
                    <span class="info-detail"></span>
                </div>
                 <div class="mb-2" v-else>
                    No witnesses. 
                 </div>
            </div>

            <div class="col-span-full sm:col-span-12 lg:col-span-4 md:col-span-4 gap-3 mb-3 py-3 px-4 block">
                <p class="text-base font-bold text-gray-800">
                    <i class="fa fa-solid fa-paperclip"></i> Attachments
                </p>
                <div class="mb-2" v-if="uplodsFound">
                <ul>
                    <li v-for="(uploads, key) in claim.upload" :key="key" class="mb-2">
                    {{key}}
                   <div v-if="isArray(uploads)" class="flex justify">
                            <div  v-for="(item, itemKey) in uploads" :key="itemKey" class="item-container  mx-3">
                                    <a :href="item.url"  v-if="item.extension != 'pdf'" target="_blank">
                                        <i class="fa fa-solid fa-file-image"> </i>
                                    </a>
                                    <!--//img :src="item.url" :alt="item.extension"  width="150px" v-if="item.extension != 'pdf'"
                                    -->
                                    <a v-else :href="item.url" target="_blank" class="">
                                        <i class="fa fa-solid fa-file-contract"></i>
                                    </a> 
                            </div>
                    </div>
                    <div v-else class="flex justify">
                               <div class="item-container mx-3">
                                        <!--//img :src="uploads.url" :alt="key" class="col-span-2" width="150px"-->
                                        <a :href="uploads.url"  v-if="uploads.extension != 'pdf'" target="_blank">
                                            <i class="fa fa-solid fa-file-image"> </i>
                                        </a>
                                        <a v-else :href="uploads.url" target="_blank" class="">
                                                <i class="fa fa-solid fa-file-contract"></i>
                                            </a> 
                                </div>
                    </div>
                    </li>
                </ul>
                    <span class="info-detail"></span>
                </div>
                 <div class="mb-2" v-else>
                    No documents attached by owner. 
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import MotorClaimListActions from '~/components/MotorClaimListActions.vue';
export default {
    name: "MotorClaim",
    head() {
        return {
            title: "View Claim",
        };
    },
    data() {
        return {
            claim: {},
            claim_id: String,
            title: "View Motor Claim",
            policy_info: {},
            owner_info:null,
            setDriver: true,
            accident_details: {},
            driver: null,
            third_party: null,
            stagesModal: null,
            stages: [],
            history:[],
            stagesControlButtons: false,
            comment: "Proceed",
            stage: "Select next department",
            proceedText: "Save and continue",
            cancelText: "Cancel",
            modalTitle: "Update claim progress",
            modalHistoryTitle: "History",
            historyModal: false,
            witnessesFound: false,
            casualtiesFound: false,
            uplodsFound: false,
            extensions: {
                pdf: {ext:"pdf"}, 
                jpeg: {ext:"jpeg"}, 
                png: {ext:"png"}, 
                jpg: {ext:"jpg"}
                },
        };
    },
    created() {
        this.stagesModal = false;
        if (this.$route.params.id) {
            this.claim_id = this.$route.params.id;
            this.getClaim();
            this.loadStages();
        }
        else {
            //this.$rout.push()
        }
    },
    methods: {
        getClaim() {
            this.$axios.post("admin/motor-claim", { id: this.claim_id })
                .then(results => {
                let claim = results.data;
                let driver = {};

                 if (claim.stage == undefined) {
                    claim.stage = 0;
                    claim.department = "claims";
                }

                "witness" in claim ? this.witnessesFound = true : false
                "casualty_damage" in claim ? this.casualtiesFound = true : false
                "upload" in claim ? this.uplodsFound = true : false
                this.claim = claim;
               
               this.policy_info = this.claim.policy_info
               this.owner_info = this.claim.policy_info.owner

            

                this.accident_details = claim.accident_details;
                if (claim.owner_driving.option == "no") {
                    //this.driver = claim.owner_driving.driver
                    driver.fullname = claim.owner_driving.driver.fullname;
                    driver.contact = claim.owner_driving.driver.contact;
                    driver.date_of_birth = claim.owner_driving.driver.dob;
                    driver.address = claim.owner_driving.driver.postal_address;
                    driver.occupation = claim.owner_driving.driver.driver_occupation;
                    driver.license_id = claim.owner_driving.driver.driver_license_no;
                    driver.date_of_license_issue = claim.owner_driving.driver.date_of_license_issue;
                    driver.relationship = claim.owner_driving.driver.driver_owner_relationship;
                    driver.purpose_of_vehicle = claim.owner_driving.purpose_of_vehicle;
                }else{
                    driver.fullname = "Owner of the vehicle was operating during incident."
                }
                this.driver = driver;
                this.third_party = claim.third_party;
                if(this.third_party == 'yes'){
                this.third_party.motor_offence = claim.third_party.motor_offence.option;
                this.third_party.motor_offence_details = claim.third_party.motor_offence.details;
                }
            });
        },
        loadStages() {
            this.$axios.post("admin/motor-claim-stages", { stage_parent: "motor_claim" })
                .then(stages => {
                this.stages = stages.data;
            });
        },
        loadHistory() {
            
        },
        toggleStagesModal() {
            this.stagesModal = !this.stagesModal;
        },
        toggleHistoryModal() {
             this.$axios.post("admin/motor-claim-stages", { stage_parent: "motor_claim" })
                .then(stages => {
                this.stages = stages.his;
            });
            this.historyModal = !this.historyModal;
        },

        isArray: function(item) {
            return Array.isArray(item)
        }
       
    },

    components: { MotorClaimListActions }
}
</script>

<style>

</style>