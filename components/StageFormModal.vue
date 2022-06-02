<template>
<div>
    <Modal :showModal="stagesModal" :title="modalTitle" 
      :cancelText="cancelText" 
      :proceedText="proceedText"
      @cancel="toggleStagesModal"
      @success="updateStage">
            <form @submit.prevent="">
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Select next department
                </span>
                
              </label>
              <select v-model="stage" class="block w-full mt-1 text-base form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option class="capitalize" value="">Select the next department</option>
                  <option class="capitalize" v-for="(s, i) in stages" :key="i" :value="i"> {{s.department}} ({{i}} - {{s.activity}})</option>
              </select>
              

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">Comment</span>
                <textarea v-model="comment" required class="block w-full mt-1 text-sm form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" rows="3" placeholder="Please enter your comments.">

                </textarea>
              </label>

              </form>
      </Modal>
        <button type="button" title="Move to next stage." @click="toggleStagesModal()" class="text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                     <i class="fa fa-arrow-right"></i>
                  </button>
      </div>
</template>

<script>

export default {
    name: "StageFormModal",
    data(){
        return {
            stagesModal: false,
            stages: [],

        }
    },
    props: {
        stagesControlButtons: false,
        comment: "Proceed",
        stage: "Select next department",
        proceedText: "Save and continue",
        cancelText: "Cancel",
        stagesModalHandle: null,
        modalTitle: "Update claim progress"
    },

    created() {
        this.stagesModal = false
        this.loadStages()
       
    },

    computed: {
        initializeModalState(){
            this.stagesModal = this.stagesModalHandle; 
        }
       
    },

    methods: {
        updateStage(){
          console.log( this.stages[this.stage])
          this.$axios.post("admin/motor-claim-update-stage", {previous: this.claim.stage, current: this.stage,
          current_department: this.stages[this.stage],
          previous_department: this.stages[this.claim.stage],
          comment: this.comment, 
          type: 'motor_claim', direction: this.direction, id: this.claim._id})
          .then(data=>{
            this.toggleStagesModal()
          })
        },

        loadStages(){
            this.$axios.post("admin/motor-claim-stages", { stage_parent: 'motor_claim' })
              .then(stages =>{
                this.stages= stages.data
              })
        },

        toggleStagesModal(){
          this.stagesModal = !this.stagesModal
        },
    }
}

</script>