<template>
    <div class="pt-6 mt-8 px-4 h-full pb-10">

      <Breadcrumbs :title="policy_info.policy_number" :controlButtons="stagesControlButtons" />
      
      <div class="grid md:grid-cols-12 md:grid-cols-5 sm:grid-cols-2 gap-3">
          <div class="bg-white shadow  rounded md:mt-0 w-full sm:col-span-6 xl:p-0 md:col-span-4">
            <div class="p-2 sm:p-4 lg:p-10 space-y-8">
                <ClaimDetail :detailObject="policy_info.owner" title="Owner Details" iconClass="fa fa-solid fa-address-card" />
                <ClaimDetail :detailObject="policy_info.vehicle" title="Vehicle Details" iconClass="fa fa-solid fa-car-side" />
              </div>
              <div class="p-2 sm:p-4 lg:p-10 lg:pt-0 sm:justify-center pt-0">
                         <ListActions recordType="motor_claim" :item="claim" :stagesControlButtons="true" :linkToView="false" stagesType="motor_claim" linkPrepend="motor/" :id="claim_id" />
              </div>
          </div>

          <div class="bg-white shadow  rounded md:mt-0 w-full sm:col-span-6 xl:p-0 md:col-span-8">
            <div class="p-2 sm:p-4 lg:p-10 space-y-8">
                <ClaimDetail :detailObject="accident_details" title="Accident Details" iconClass="fa fa-solid fa-car-bump" />
                <ClaimDetailRows :detailObject="driver" title="Driver Details" iconClass="fa fa-solid fa-steering-wheel" />
            </div>
            
          </div>

          <!--div class="bg-white shadow  rounded md:mt-0 w-full sm:col-span-6 xl:p-0 md:col-span-4">
            <div class="p-2 sm:p-4 lg:p-10 space-y-8">
            Attachments
            </div>
          </div>

           <div-- class="bg-white shadow  rounded md:mt-0 w-full sm:col-span-6 xl:p-0 md:col-span-8">
            <div class="p-2 sm:p-4 lg:p-10 space-y-8">
              third party
            </div>
          </div-->

        </div>
       
    </div>
</template>

<script>
import ListActions from '~/components/ListActions.vue';
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
            owner_info: {},
            accident_details: {},
            driver: null,
            stagesModal: null,
            stages: [],
            stagesControlButtons: false,
            comment: "Proceed",
            stage: "Select next department",
            proceedText: "Save and continue",
            cancelText: "Cancel",
            modalTitle: "Update claim progress",
            modalHistoryTitle: "History",
            historyModal: false
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
                // console.log(results.data);
                let claim = results.data;
                let driver = {};
                this.claim = results.data;
                if (claim.stage == undefined) {
                    claim.stage = 0;
                    claim.department = "claims";
                }
                this.policy_info = claim.policy_info;
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
                }
                this.driver = driver;
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
            this.historyModal = !this.historyModal;
        },
        updateStage() {
            alert(this.claim._id);
            console.log(this.stages[this.stage]);
            this.$axios.post("admin/motor-claim-update-stage", { previous: this.claim.stage, current: this.stage, current_department: this.stages[this.stage], previous_department: this.stages[this.claim.stage], comment: this.comment, type: "motor_claim", direction: this.direction, claim_id: this.claim._id })
                .then(data => {
                this.getClaim();
                this.toggleStagesModal();
            });
        }
    },
    components: { ListActions }
}
</script>

<style>

</style>