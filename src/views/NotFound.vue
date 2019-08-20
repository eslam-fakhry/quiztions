<template>
  <div class="d-flex justify-center align-center ">
    <div class="text-center">
      <h1>404</h1>
      this page not found
    </div>
  </div>
</template>
<script>
    import layoutMixin from "@/layouts/layoutMixin"

    export default {
        name: "NotFound",

        mixins: [layoutMixin,],
    }

</script>
