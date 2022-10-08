<template>
    <div class="mb-3 ticker-search">
        <label class="icon_search bg-gray-400 text-gray-700 text-xs" for="ticker_search"></label>
        <input id="ticker_search" type="text" class="w-full border border-gray-300 bg-white pt-2 pl-10 color-gray-500 pr-4 pb-2 shadow-sm rounded-md" placeholder="Найти тикер">
    </div>

    <div class="grid grid-cols-3 gap-3 pb-6 border-b border-b-gray-300">
        <Ticker v-for="(ticker, key) in tickers" :key="key" :settings="ticker"/>
    </div>
</template>

<script>
import Ticker from "@/components/elements/ticker";

export default {
    name: "blockTickers",
    components: {
        Ticker,
    },
    data() {
        return {
            tickers: [
                {name: 'ETH', price: '1095.45$'},
                {name: 'ETH', price: '1095.45$'},
                {name: 'ETH', price: '1095.45$'},
                {name: 'ETH', price: '1095.45$'},
                {name: 'ETH', price: '1095.45$'},
                {name: 'ETH', price: '1095.45$'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.ticker-search {
    position: relative;
    input {
        max-width: 456px;
    }
    .icon_search {
        position: absolute;
        width: 15px;
        height: 15px;
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
        mask-image: url("./../images/search.svg");
        top: 13px;
        left: 15px;
    }
}
</style>
