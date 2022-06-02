<template>
    <client-only>
      <aside id="sidebar" class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex-1 px-3 bg-white divide-y space-y-1">
              <ul class="space-y-2 pb-2">
                <li>
                  <form action="#" class="lg:hidden">
                    <label for="mobile-search" class="sr-only">Search</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></i>
                      </div>
                      <input type="text" name="email" id="mobile-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search">
                    </div>
                  </form>
                </li>

                <li v-for="(link, i) in links" :key="i" v-if="checkSublinks(link.subLinks)">

                <button type="button" class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" :aria-controls="'dropdown-'+link.id" :data-collapse-toggle="'dropdown-'+link.id">
                        <i :class="link.icon"></i>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>{{link.label}}</span>
                        <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                <ul :id="'dropdown-'+link.id" class="hidden py-2 space-y-2">
                    <li  v-for="(l, i) in link.subLinks" :key="i">
                        <nuxt-link :to="l.href" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                       <i :class="l.icon"></i>
                       <span class="ml-3">{{l.label}}</span>
                      </nuxt-link>
                    </li>
                </ul>
              </li>
              <li v-else>
                  <nuxt-link :to="link.href" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i :class="link.icon"></i>
                      <span class="ml-3">{{link.label}}</span>
                  </nuxt-link>
                </li>
                
                
              </ul>
              <div class="space-y-2 pt-2">
                <nuxt-link :to="link.href"  v-for="(link, i) in systemLinks" :key="i" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i :class="link.icon"></i>
                      <span class="ml-3">{{link.label}}</span>
                  </nuxt-link>
              </div>
            </div>
          </div>
        </div>
    </aside>
   </client-only>
</template>

<script>
export default {
    name: 'Navigation',
    data(){
       return {
          activeLink: '#',
            links : [
              {
                label: 'Dashboard',
                href: '/',
                title: 'Dashboard',
                id: 'dashboard-main',
                icon: 'fa fa-solid fa-chart-pie'
            },
            {
                label: 'Claims',
                href: '/claims',
                title: 'Claims',
                id: 'claims-main',
                icon: 'fa fa-cabinet-filing',
                subLinks: [
                    {
                        label: 'Motor',
                        href: '/claims/motor',
                        title: '',
                        id: 'claim-motor',
                        icon: 'fa fa-car'
                    }
                ]
            },
            {
                label: 'Proposals',
                href: '/proposals',
                title: 'Proposals',
                id: 'proposals-main',
                icon: 'fa fa-cabinet-filing',
                subLinks: [
                    {
                        label: 'Motor',
                        href: '/proposals/motor',
                        title: '',
                        id: 'proposal-motor',
                        icon: 'fa fa-car'
                    }
                ]
            }
            ],

            systemLinks : [
              {
                label: 'Logs',
                href: '#',
                title: 'Logs',
                id: 'logs-main',
                icon: 'fa fa-car'
             },
             {
                label: 'Help',
                href: '#',
                title: 'Help',
                id: 'help-main',
                icon: 'fa fa-life-ring'
             },
            ]
        };
    },


    methods: {
      checkSublinks(subLinks){
        if(Array.isArray(subLinks)) {
          return true
        }
        return false
      }
    }
}
</script>

<style>

</style>