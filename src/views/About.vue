<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
    import layoutMixin from "@/layouts/layoutMixin"

    export default {
        name: "About",

        mixins: [layoutMixin,],
    }

</script>
