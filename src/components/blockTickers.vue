<template>
    <div class="mb-3 relative">
        <label class="icon_search absolute bg-gray-400 text-gray-700 text-xs" for="ticker_search"></label>
        <input v-model.trim="searchTickerName" id="ticker_search" type="text" class="w-full border border-gray-300 bg-white pt-2 pl-10 color-gray-500 pr-4 pb-2 shadow-sm rounded-md" placeholder="Найти тикер">
    </div>

    <div class="pb-6  lg:border-b lg:border-b-gray-300">
        <div class="grid grid-cols-1 gap-3 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
            <Ticker v-for="(ticker, key) in showTicker" :key="key+ticker.name"
                    :settings="ticker"
                    @removeTicker="removeCardTicker(key,ticker)"
                    @selectTicker="select(ticker, $event)"/>
        </div>

        <DashBoard class="mt-6" v-if="selectTicker" :prices="pricesTicker"/>
    </div>

    <div class="clone block h-16 lg:hidden"></div>
    <div v-if="getTickers.length > 6 && !searchTickerName" class="flex justify-between items-center fixed bottom-0 left-0 w-full py-3 px-4 bg-white border-t border-t-gray-200 lg:border-t-inherit lg:relative lg:bottom-auto lg:left-auto lg:w-full lg:py-0 lg:pt-3 lg:px-0 lg:bg-transparent">
        <span class="text-gray-700 text-sm hidden sm:block">Показано {{ showCounterTickers }} результатов из {{ getTickers.length }}</span>
        <div class="flex w-full justify-between sm:justify-start sm:w-auto">
            <button v-if="startPage" @click="back" class="bg-white shadow-sm text-sm py-2 px-4 rounded-md mr-3 border border-gray-300 hover:bg-gray-50">Назад</button>
            <button @click="next" class="bg-white shadow-sm text-sm py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50">Вперед</button>
        </div>
    </div>
</template>

<script>
import Ticker from "@/components/elements/ticker";
import DashBoard from "@/components/elements/dashBoard";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "blockTickers",
    components: {
        Ticker,
        DashBoard,
    },
    data() {
        return {
            searchTickerName: '',
            selectTicker: false,
            connection: null,
            key: 'e2eac3f67ff5094f31df8c203de11bc6fdea03c478ee5c49a2cf816957669a47',
            isEmptyTicker: false,
            countTicker: 6,
            numberPage: 1,
            startPage: 0,
            pricesTicker: [],
            tickerInterval: null,
        }
    },
    methods: {
        ...mapMutations([
            'updateTickers',
            'updateCollections',
            'removeTicker',
            'removeItemCollections',
            'offSelectedTicker',
        ]),
        ...mapActions([
            'fetchTickerIsInterval',
        ]),
        removeCardTicker(key, ticker) {
            this.removeTicker(key)
            this.removeItemCollections(ticker.name)
        },
        select(ticker, event) {
            if(this.selectTicker) {
                clearInterval(this.tickerInterval)
                this.offSelectedTicker()
                this.pricesTicker = []
            }
            this.selectTicker = event
            ticker.selected = event
            this.selectTicker ? this.startTickerIsInterval(ticker.name) : clearInterval(this.tickerInterval)
        },
        startTickerIsInterval(tickerName) {
            this.tickerInterval = setInterval(async () => {
                let res = await this.fetchTickerIsInterval({
                    name: tickerName,
                    apiKey: 'e2eac3f67ff5094f31df8c203de11bc6fdea03c478ee5c49a2cf816957669a47'
                })
                if(res.USD > 1000) {
                    res.USD = res.USD / 100
                } else if(res.USD > 100) {
                    res.USD = res.USD / 10
                }
                this.pricesTicker.push(res.USD)
            },3000)
        },
        back() {
            if(this.startPage) {
                this.numberPage--
                this.startPage--
            }
        },
        next() {
            this.numberPage++
            this.startPage++
        },
    },
    computed: {
        ...mapGetters([
            'getTickers',
        ]),
        showTicker() {
            if(this.searchTickerName) {
                return this.getTickers.filter(item => item.name.toLowerCase().includes(this.searchTickerName))
            }
            return this.getTickers.slice(this.countTicker * this.startPage, this.countTicker * this.numberPage)
        },
        showCounterTickers() {
            if(this.numberPage === 1) {
                return this.countTicker * this.numberPage
            } else {
                return this.countTicker * this.startPage + this.showTicker.length
            }
        }
    },
    mounted() {
        if(window.localStorage.getItem('tickers')) {
            let tickers = window.localStorage.getItem('tickers')
            tickers = JSON.parse(tickers)
            tickers.forEach(item => {
                this.updateTickers(item)
                this.updateCollections(item.name)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    max-width: 456px;
}
.icon_search {
    width: 15px;
    height: 15px;
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-image: url("./../images/search.svg");
    top: 13px;
    left: 15px;
}
</style>
