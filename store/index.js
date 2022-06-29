//state

const state = ()=> {
    return   {
    motorClaims: [],
    departments: [],
    motorClaim: {},
    claimHistory: []
    }  
}

//getters
const getters = {
        departments: (state) => {
            return state.departments
        },

    claim(){
        
    },

    claimHistory(){
        
    }
}
//Actions
const actions = {
     loadMotorClaims({commit}){
        var i = 0;
        
        this.$axios.post("admin/motor-claims").then(cl=>{
           let data = cl.data
           let allClaims = []
           data.forEach((claim, i, cl) => {
                    if(!claim.stage){
                        claim.stage = 0
                        claim.department = 'claims'
                    } 
                allClaims[claim.department] = []
              })

              data.forEach((claim, i, cl) => {
                if(!claim.stage){
                    claim.stage = 0
                    claim.department = 'claims'
                }       allClaims[claim.department][i] = claim
                  })
            commit('setClaims', allClaims)
        })
       
    },

    loadMotorClaim(){
        
    },

    getMotorClaimHistory(){
        
    },

}

//mutations
const mutations = {
    setClaims: (state , claims) => {
        state.departments = claims
    },

    setClaim(state, claim){

    },

    setClaimHistory(state, history){},
}

export default {
    state,
    getters,
    actions,
    mutations
}