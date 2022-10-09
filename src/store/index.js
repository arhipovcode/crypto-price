import {createStore} from 'vuex'
import tickers from "@/modules/tickers";
import wsTickers from "@/modules/wsTickers";

export default createStore({
    modules: {
        tickers,
        wsTickers,
    }
})
