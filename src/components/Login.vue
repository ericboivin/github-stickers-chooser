<template>
  <div id="app">
    <h2>Veuillez fournir votre clé de 36 caractères pour continuer</h2>
    <input v-model="key">
    <button type="button" class="btn btn-green" @click="confirm" aria-label="Confirmer">
      Confirmer!
    </button>
    <p class="error">{{errorMsg}}</p>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      key: this.$route.query.key,
      errorMsg: ''
    }
  },
  methods: {
    confirm () {
      var self = this
      this.setkey()
      axios.get('http://localhost:5000/api/student/' + this.key)
        .then(function (response) {
          self.$router.push('/stickers')
        })
        .catch(function (error) {
          console.log(error)
          self.errorMsg = 'Erreur dans la requête. Mauvaise clé?'
        })
    },
    setkey () {
      this.$store.key = this.key
    }
  }
}
</script>

<style scoped>
#app {
  padding-top: 50px;
}
.error {
  color: red;
}
input {
  width: 275px;
  padding: 5px;
}
.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
