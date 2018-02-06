<template>
  <div id="app">
    <h1 class="title">Félicitations!</h1>
    <p>Vous avez complété le devoir en entier avec succès. Vous pouvez choisir un autocollant GitHub.</p>
    <p>Dans le domaine du développement Internet, les autocollants sont très populaires, et ceux de GitHub en particulier sont très en demande! Ils nous en ont envoyé plusieurs différents en quantités limitées, alors réclamez votre autocollant. Si vous n'en désirez pas, vous pouvez quitter cette application!</p>
    <img src="../assets/stickers.png?noresize" usemap="#stickersmap" />

    <map name="stickersmap" id="stickersmap">
        <stickerArea v-for="sticker in stickers" :sticker="sticker" :key="sticker.id" @select="select"></stickerArea>
    </map>
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

        let stickerCoords = new Map()
        let coords = {
          Cowboytocat: '40,190,202,442',
          Astrotocat: '16,454,158,672',
          Skatetocat: '170,542,352,734',
          Jetpacktocat: '364,544,532,734',
          Femalecodertocat: '542,542,732,734',
          Codercat: '748,564,948,732',
          Punktocat: '958,552,1128,738',
          Professortocat: '1134,562,1314,732',
          Benevocats: '568,370,756,536',
          Mardigrastocat: '758,382,952,552',
          Octonaut: '952,380,1104,548',
          Dojocat: '1110,386,1310,554',
          Cherryontopocat: '368,378,182,532',
          SnowOctocat: '374,374,560,534',
          Filmtocat: '384,196,536,362',
          OctocatDeLosMuertos: '380,192,206,370',
          Labtocat: '540,190,706,362',
          Surftocat: '732,200,912,374',
          Saritocat: '914,200,1056,364',
          Robotocat: '1064,210,1246,374',
          DJtocat: '194,34,394,186',
          Octocat: '396,34,554,186',
          Yaktocat: '562,26,722,186',
          ClassAct: '728,20,902,194',
          Inflatocat: '908,24,1070,198',
          Kimonotocat: '1084,36,1252,200'
        }
        Object.keys(coords).forEach(key => {
          stickerCoords.set(key, coords[key])
        })

        stickers.forEach(function (sticker, index) {
          sticker.coords = stickerCoords.get(sticker.name)
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
      this.selectedSticker = target
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
img {
  overflow: scroll;
  height: initial;
  max-width: none;
}
</style>
