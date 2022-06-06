<template>
<div>
    <Modal :showModal="stagesModal" :title="modalTitle" 
      :cancelText="cancelText" 
      :proceedText="proceedText"
      @cancel="toggleStagesModal"
      @success="updateStage"
      :controlButtons="stagesControlButtons">
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
               <button type="button" title="View & attach documents."  class="text-white content-center bg-teal-500 w-full hover:bg-teal-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                <i class="fa fa-paperclip"> </i> Add Attachments
            </button>
              </form>
      </Modal>

      <Modal :showModal="historyModal" :title="historyModalTitle" 
      :cancelText="cancelText" 
      :proceedText="proceedText"
      @cancel="toggleHistoryModal"
      @success="toggleHistoryModal"
      :controlButtons="historyControlButtons">
      </Modal>
        <nuxt-link v-if="linkToView"  type="button" :to="linkPrepend+id" title="View" class="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-eye"></i> 
        </nuxt-link>
        <button type="button" title="View history" @click="toggleHistoryModal()" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-history"></i>
        </button>
        <button type="button" title="Move to next stage." @click="toggleStagesModal()" class="text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-arrow-right"></i>
        </button>
      </div>
</template>

<script>

export default {
    name: "ListActions",
    data(){
        return {
            stagesModal: false,
            stages: [],
            stagesModal: false,
            comment: "Proceed",
            stage: "Select next department",
            proceedText: "Save and continue",
            cancelText: "Cancel",
            modalTitle: "Update claim progress",
            historyModalTitle: "History",
            historyModal: false,
            stages: [],
            historyRecords: []
        }
    },
    props: {
       linkToView: Boolean,
       id: String,
       historyControlButtons: Boolean,
       stagesControlButtons: Boolean,
       linkPrepend: String,
       recordType: String,
       stagesType: String,
       item: {},
    },

    created() {
        this.stagesModal = false
        this.loadStages()

    },

    computed: {
      
       
    },

    methods: {
        updateStage(){
          console.log( this.item)
          this.$axios.post("admin/motor-claim-update-stage", {previous: this.item.stage, current: this.stage,
          current_department: this.stages[this.stage],
          previous_department: this.stages[this.item.stage],
          comment: this.comment, 
          type: this.recordType, direction: this.direction, id: this.id})
          .then(data=>{
            this.toggleStagesModal()
          })
        },

        loadStages(){
            this.$axios.post("admin/motor-claim-stages", { stage_parent: this.stagesType })
              .then(stages =>{
                this.stages= stages.data
              })
        },

        toggleStagesModal(){
          this.stagesModal = !this.stagesModal
        },

        toggleHistoryModal() {
            this.getHistory()
            this.historyModal = !this.historyModal;
        },

        getHistory(){
           this.$axios.post("admin/records", { recordType: this.recordType, recordId: this.id})
             .then(history =>{
                this.historyRecords= history.data
              })
        },
        
    }
}

</script>