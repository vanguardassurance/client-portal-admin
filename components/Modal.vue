<template>
  <div>
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  focus:outline-none justify-center items-center flex">
    
      <div class="relative w-full max-h-96 md:max-w-lg mx-auto">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div v-if="title" class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-xl font-semibold">
              {{title}}
            </h3>
            <button class="p-1 ml-auto bg-transparent -mt-5 -mr-4 border-0 text-black opacity-8 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="emitCancel()">
              <span class="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-slate-500 text-lg leading-relaxed">
              <slot></slot>
            </p>
          </div>
          <!--footer-->
          <div v-if="controlButtons" class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
             <button class="px-4 mt-2 mr-3 py-1 block text-white font-light tracking-wider hover:bg-red-500 bg-red-700 rounded"  @click="emitCancel" focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150>
                               {{cancelText}}
              </button>
            
              <button type="submit" class="px-4 mt-2 py-1 block text-white font-light tracking-wider hover:bg-blue-500 bg-blue-700 rounded"  @click="emitProceed" focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150>
                               {{proceedText}}
              </button>

          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
    name: "Modal",
    props: {
            showModal: false,
            title: null,
            defaultClose: true,
            controlButtons: false,
            proceedText: String,
            cancelText: String,
            controlButtons: Boolean
        },
    data() {
        return {
          defaultButtons: false
        }
    },


        created() {
        },

        mounted() {
         
        },
        
        methods: {
            emitProceed(){
                this.$emit('success')
            },

          emitCancel(){
              this.$emit('cancel')
          },

          toggleModal(){
            if(this.defaultClose == false){
              this.showModal = !this.showModal
            }
          }
        }
}
</script>