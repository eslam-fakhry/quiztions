<template>
  <div class="d-flex justify-center align-center page">
    <div class="text-center">
      <img :src="require('@/assets/404.svg')" width="300" alt="page not found">
      <div class="pt-4 link">Page not found <router-link :to="{name:'home'}">Home</router-link></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NotFound",
    }
</script>
