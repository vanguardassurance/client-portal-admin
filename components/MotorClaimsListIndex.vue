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
                                        <div class="text-xs font-normal text-gray-500" v-if="claim.department">{{claim.department}}</div>
                                        <div class="text-xs font-normal text-gray-500" v-else>Claims</div>
                                    </td>
                                    
                                    <td class="p-2 whitespace-nowrap space-x-2text-right ">
                                        <nuxt-link type="button" :to="links.view+claim._id" title="View" class="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <i class="fa fa-eye"></i>
                                        </nuxt-link>
                                        <button type="button" @click="loadCommentsBox(claim.id)" title="Comment." class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <i class="fa fa-comment"></i>
                                        </button>
                                        <button type="button" title="View history" @click="loadHistory(claim.id)" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <i class="fa fa-history"></i>
                                        </button>
                                        <button type="button" title="Move to next stage." @click="loadStages(claim.id)" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                            <i class="fa fa-arrow-right"></i>
                                        </button>
                                    </td>
                                </tr>                
                            </tbody>
                        </table>
                </div>
</template>


<script>

export default {
    name: "MotorClaimsListIndex",
    props: {
        claims: []
    },
    data: ()=> {
        return {
            links: {'view': 'motor/'}
        }
    }
}

</script>