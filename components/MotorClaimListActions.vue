<template>
<div>
<Modal :showModal="showMessageModal" title="Send message to client." 
      :cancelText="cancelText" 
      proceedText="Send message"
      @cancel="toggleMessageCustomer()"
      @success="sendMessage"
      :controlButtons="stagesControlButtons">
            <form @submit.prevent="">
              <label class="block mt-4 text-sm dark:text-gray-400">
                  Please typ message to send.
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">Message</span>
              </label>
                <textarea v-model="msg"  required class="block w-full mt-1 text-sm form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" rows="3" placeholder="Dear customer,">
               </textarea>
               
              </form>
      </Modal>
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
              <select v-model="stage" class="block w-full mt-1 dark:text-gray-400 text-base form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option class="capitalize dark:text-gray-400" value="">Select the next department</option>
                  <option class="capitalize dark:text-gray-400" v-for="(s, i) in stages" :key="i" :value="i"> {{s.department}} ({{i}} - {{s.activity}})</option>
                  <option class="capitalize dark:text-gray-400" value="completed"> completed</option>
              </select>
              

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">Comment</span>
                <textarea v-model="comment" required class="block w-full mt-1 text-sm form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" rows="3" placeholder="Please enter your comments.">

                </textarea>
              </label>
               
              </form>
      </Modal>

      <Modal :showModal="driverModal" title="Driver Details" 
      :cancelText="cancelText" 
      :proceedText="proceedText"
      @cancel="toggleDriverModal"
      @success="toggleDriverModal"
      :controlButtons="historyControlButtons">
        <div v-if="driver.option == 'no'">
            <div class="mb-2" v-for="(info, i) in driver.driver" :key="i">
            <span  v-if="i !== 'vehicle_consent'">
              <div class="text-gray-800 font-bold mb-1 capitalize">{{i}}:</div> 
              <span class="info-detail">{{info}}</span>
              </span>
            </div>
            <div>
            <div class="text-gray-800 font-bold mb-1 capitalize">vehicle consent:</div> 
              <span class="info-detail">{{driver.driver.vehicle_consent.option}}</span>
            </div>
        </div>
        <div v-else>
            Owner of vehicle
        </div>
      </Modal>


      <Modal :showModal="attachmentModal" title="add attachments" 
      :cancelText="'Cancel'" 
      :proceedText="'Ok'"
      @cancel="toggleAttachmentModal"
      @success="toggleAttachmentModal"
      :controlButtons="false">
          <file-pond
            name="attachments"
            ref="pond"
            label-idle="Drop files here..."
            v-bind:allow-multiple="true"
            accepted-file-types="image/jpeg, image/png, application/pdf"
            server="/api"
            v-bind:files="files"
            v-on:init="handleFilePondInit"/>
          
      </Modal>

       <Modal :showModal="historyModal" :title="historyModalTitle" 
      :cancelText="'Cancel'" 
      :proceedText="'Ok'"
      @cancel="toggleHistoryModal"
      @success="toggleHistoryModal"
      :controlButtons="historyControlButtons">
          <div v-if="!recordComment">
            <div v-if="historyRecords.length >0" >
              <div class="my-1 border-b border-gray-300  clear-both mb-4" v-for="(record, i) in historyRecords" :key="i">
                <div class="text-sm">
                 <i @click="showRecordComment(record)" class="fa fa-eye text-gray-300 hover:text-gray-600 hover:cursor-pointer"></i>
                &nbsp; 
                  {{record.previous_department.department}} <i :class="historyIcons[record.direction]"></i>  {{record.current_department.department}}
                </div>
                <div class="float-right text-sm">
             
                {{record.created_at | formatDate}}
                </div>
              </div>
            </div>
          </div>
          <div v-if="recordComment">
            <div class="">
              {{currentRecord.previous_department.department}} <i :class="historyIcons[currentRecord.direction]"></i>  {{currentRecord.current_department.department}}
            </div>
             <div class="text-sm mt-2">
                <b>Comments</b>
                <br />
                 {{currentRecord.comment}}
              </div>

              <div class="text-sm text-gray-400 mt-2">
               
                <br />
                 {{currentRecord.created_at | formatDate}}
              </div>
              <div class="float-right">
              <button @click="resetShowComment()"><i class="fa fa-chevron-left"> </i> Back</button></div>
          </div>
      </Modal>
        <nuxt-link v-if="linkToView"  type="button" :to="genLink+id" title="View" class="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-eye"></i> 
        </nuxt-link>
        <button type="button" title="View history" @click="toggleHistoryModal()" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-history"></i>
        </button>
        <button type="button" title="View & attach documents." @click="toggleAttachmentModal()" class="text-white content-center bg-teal-500 hover:bg-teal-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                <i class="fa fa-paperclip"> </i> 
        </button>
        <button type="button" title="Move to next stage." @click="toggleStagesModal()" class="text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <i class="fa fa-arrow-right"></i>
        </button>
        <button type="button" v-if="driverOption" title="Show Driver." @click="toggleDriverModal()" class="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                    <i class="fa fa-solid fa-steering-wheel"></i>
        </button>
        <button v-if="enabledNotifier" type="button" title="Send a message to customer." @click="toggleMessageCustomer()" class="text-white bg-sky-500 hover:bg-sky-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                    <i class="fa fa-envelope-open"></i>
        </button>
      </div>
</template>

<script>

import vueFilePond from 'vue-filepond';

// Create component
const FilePond = vueFilePond(
//  FilePondPluginFileValidateType,
//  FilePondPluginImagePreview
);

export default {
    name: "MotorClaimListActions",
    data(){
        return {
            recordComment: false,
            currentRecord:{},
            genLink: "",
            files: [],
            stagesModal: false,
            stages: [],
            stagesModal: false,
            msgModal: false,
            attachmentModal: false,
            showMessageModal: false,
            driver: {},
            driverModal: false,
            comment: "Proceed",
            stage: "Select next department",
            proceedText: "Save and continue",
            cancelText: "Cancel",
            modalTitle: "Update claim progress",
            historyModalTitle: "History",
            historyModal: false,
            history: [],
            stages: [],
            attachmentModalTitle: "Attachments",
            historyIcons: {
              forwards: "fa fa-arrow-right text-green-600",
              backwards: "fa fa-arrow-left text-red-600",
              unchanged: "fa fa-circle text-amber-600",
            },
            historyRecords: [],
            msg: "",
        }
    },
    props: {
       linkToView: Boolean,
       enabledNotifier: Boolean,
       driverOption: Boolean,
       id: String,
       historyControlButtons: Boolean,
       stagesControlButtons: Boolean,
       linkPrepend: "",
       recordType: String,
       stagesType: String,
       item: {},
    },

    created() {
        this.stagesModal = false
        this.loadStages()
        this.genPrepend()
        this.getDriver()
    },

  

    computed: {
       
    },
  mounted() {
  },
    methods: {

      handleFilePondInit: function () {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },

        updateStage(){
          this.$axios.post("admin/motor-claim-update-stage", {previous: this.item.stage, current: this.stage,
          current_department: this.stages[this.stage],
          previous_department: this.stages[this.item.stage],
          comment: this.comment, 
          type: this.recordType, direction: this.direction, id: this.id})
          .then(data=>{
            this.toggleStagesModal()
            this.$emit('updateSuccessfull', data)
          })
        },

        AlertCustomer(){
          this.$emit('AlertCustomerSuccessfull', data)
        },

        loadStages(){
            this.$axios.post("admin/motor-claim-stages", { stage_parent: this.stagesType })
              .then(stages =>{
                this.stages= stages.data
              })
        },

        getDriver(){
            this.$axios.post("admin/motor-claim-driver", { id: this.id })
              .then(result =>{
                this.driver = result.data
                this.driver =  JSON.parse(JSON.stringify((this.driver)))
              })
        },

        sendMessage(){
          if(this.msg == ""){
            return false;
          }
           this.$axios.post("admin/send-msg-claim-client", { id: this.id, msg: this.msg })
              .then(result =>{
                console.log(result)
              })
        },

        toggleStagesModal(){
          this.stagesModal = !this.stagesModal
        },

        toggleAttachmentModal(){
          this.attachmentModal = !this.attachmentModal
        },

        toggleDriverModal(){
          this.driverModal = !this.driverModal
        },

        showRecordComment(record){
          this.currentRecord = record
          this.recordComment = !this.recordComment
        },

        resetShowComment(){
          this.recordComment = false
        },
        genPrepend(){
          if(this.linkPrepend == undefined){
            this.genLink = ""
          }else{
            this.genLink = this.linkPrepend
          }
        },

        toggleMessageCustomer(){
            this.showMessageModal = !this.showMessageModal
        },

        toggleHistoryModal() {
            this.recordComment = false
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