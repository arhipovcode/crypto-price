<template>
    <div class="scoreboard p-4 mt-6 mb-4 rounded-lg bg-white">
        <div class="scoreboard__group relative mb-3">
            <label class="absolute text-gray-700 text-xs" for="board_search">Тикер</label>
            <input v-model.trim="tickerName" id="board_search" type="text" class="scoreboard__input w-full border border-gray-300 rounded-md bg-white color-gray-500" placeholder="Например DOGE">
        </div>

        <button @click="addTicker" class="scoreboard__btn bg-indigo-600 text-white shadow-sm rounded-lg py-2 px-6 hover:bg-indigo-700">Добавить</button>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "scoreboard",
    data() {
        return {
            tickerName: '',
        }
    },
    methods: {
        ...mapActions([
            'fetchTicker',
            'connectionSocket',
        ]),
        async addTicker() {
            if(!this.tickerName) return false

            if(this.getCollectionsTicker.has(this.tickerName)) {
                this.tickerName = ''
                return true
            }

            // this.connectionSocket({name: this.tickerName.toUpperCase(), key: 'e2eac3f67ff5094f31df8c203de11bc6fdea03c478ee5c49a2cf816957669a47'})
            await this.fetchTicker({
                name: this.tickerName,
                apiKey: 'e2eac3f67ff5094f31df8c203de11bc6fdea03c478ee5c49a2cf816957669a47'
            })
            this.tickerName = ''
        },
    },
    computed: {
        ...mapGetters([
            'getCollectionsTicker',
        ])
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.scoreboard {
    &__group {
        label {
            top: 9px;
            left: 13px;
        }
    }
    &__input {
        max-width: 440px;
        padding: 25px 13px 9px 13px;
    }
}
</style>
