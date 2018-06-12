<template>
  <div id="app">
    <h1 class="title">Félicitations!</h1>
    <p>Vous avez complété le devoir en entier avec succès. Vous pouvez choisir un autocollant GitHub.</p>
    <p>Dans le domaine du développement Internet, les autocollants sont très populaires, et ceux de GitHub en particulier sont très en demande! Ils nous en ont envoyé plusieurs différents en quantités limitées, alors réclamez votre autocollant. Si vous n'en désirez pas, vous pouvez quitter cette application!</p>
    <div class="wrapper">
        <stickerArea v-for="sticker in stickers" :sticker="sticker" :key="sticker.id" @select="select" class="stickerbtn"/>
    </div>
    <modal v-show="isModalVisible" @close="closeModal" @confirm="confirmModal" :sticker="selectedSticker" />
  </div>

</template>

<script>
import axios from 'axios'
import modal from './Modal.vue'
import stickerArea from './StickerArea.vue'

export default {
  name: 'StickerApp',
  data () {
    return {
      stickers: [],
      isModalVisible: false,
      selectedSticker: '',
      message: ''
    }
  },
  components: {
    modal,
    stickerArea
  },
  beforeCreate: function () {
    axios.get('/api/sticker')
      .then(response => {
        // JSON responses are automatically parsed.
        let stickers = response.data

        stickers.forEach(function (sticker, index) {
          stickers[index] = sticker
        })
        this.stickers = stickers
      })
      .catch(e => {
        console.log(e)
        this.$notify({
          text: 'Erreur dans l\'appel de l\'API des stickers',
          duration: 5000,
          type: 'error'
        })
      })
  },
  mounted: function () {
    console.log('mounted')
  },
  methods: {
    select: function (target) {
      this.selectedSticker = target.sticker
      this.showModal()
    },
    showModal (sticker) {
      this.isModalVisible = true
    },
    closeModal () {
      this.selectedSticker = ''
      this.isModalVisible = false
    },
    confirmModal () {
      let self = this
      console.log(this.$store.key)
      if (this.$store.key) {
        axios.post('/api/reservation', {
          stickerid: this.selectedSticker._id,
          studentkey: this.$store.key
        })
          .then(function (response) {
            self.$notify({
              text: 'Réservation faite avec succès!',
              duration: 5000,
              type: 'success'
            })
          })
          .catch(function (error) {
            self.$notify({
              text: 'Erreur: ' + error.response.data,
              duration: 5000,
              type: 'error'
            })
          })
      } else {
        this.$notify({
          text: 'Clé absente, veuillez recommencer à partir de la première page',
          duration: 5000,
          type: 'error'
        })
      }
      this.isModalVisible = false
    }
  }
}
</script>

<style scoped>
@media (min-width: 600px) {
  .wrapper {
    display: grid;
    grid-template-columns: 300px 300px;
    grid-gap: 20px;
  }
}

@media (min-width: 1000px) {
  .wrapper {
    grid-template-columns: 300px 300px 300px;
  }
}

.stickerbtn:hover {
  cursor: pointer;
}
</style>
