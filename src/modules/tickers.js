import axios from "axios";

export default {
    state: {
        tickers: [],
        collectionsTicker: new Set(),
    },
    getters: {
        getTickers(state) {
            return state.tickers
        },
        getCollectionsTicker(state) {
            return state.collectionsTicker
        }
    },
    mutations: {
        updateTickers(state, payload) {
            state.tickers.push({name: payload.name, price: payload.price, selected: false})
        },
        updateCollections(state, name) {
            state.collectionsTicker.add(name)
        },
        removeItemCollections(state, name) {
            state.collectionsTicker.delete(name)
            window.localStorage.setItem('tickers', JSON.stringify(state.tickers));
        },
        removeTicker(state, index) {
            state.tickers.splice(index, 1)
        },
        offSelectedTicker(state) {
            state.tickers.find(item => {
                if(item.selected) item.selected = false
            })
        }
    },
    actions: {
        async fetchTicker(ctx, payload) {
            let result = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${payload.name}&tsyms=USD&api_key=` + payload.apiKey)
            if (result.data.Response === 'Error') {
                return false
            }
            if(!ctx.state.collectionsTicker.has(payload.name)) {
                ctx.commit('updateTickers', {name: payload.name, price: result.data.USD})
                ctx.commit('updateCollections', payload.name)
                window.localStorage.setItem('tickers', JSON.stringify(ctx.state.tickers));
            }
            return result.data
        },
        async fetchTickerIsInterval(ctx, payload) {
            let result = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${payload.name}&tsyms=USD&api_key=` + payload.apiKey)
            return result.data
        },
    }
}
