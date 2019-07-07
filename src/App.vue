<template>
  <v-app>

    <v-content>
      <Question/>
    </v-content>
  </v-app>
</template>

<script>
import Question from './components/Question'

export default {
  name: 'App',
  components: {
    Question
  },
  data () {
    return {
      //
    }
  }
}
</script>
