<template>
  <div>
      <Header />
      <div class="flex overflow-hidden bg-white pt-0">
      <Sidebar />
      <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>

      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
              <Nuxt />
          </main>
      </div>
      </div>
  </div>
</template>

<style>

      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
