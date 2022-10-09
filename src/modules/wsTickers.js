import axios from "axios";

export default {
    state: {
        wsTickers: [],
        wsCollectionsTicker: new Set(),
        ccStreamer: null,
        tickerName: '',
    },
    getters: {
        getWsTickers(state) {
            return state.tickers
        },
        getWsCollectionsTicker(state) {
            return state.collectionsTicker
        },
        getTickerName(state) {
            return state.tickerName
        }
    },
    mutations: {
        updateWsTickers(state, payload) {
            state.tickers.push({name: payload.name, price: payload.price, select: false})
        },
        updateWsCollections(state, name) {
            state.collectionsTicker.add(name)
        },
    },
    actions: {
        connectionSocket(ctx, payload) {
            // console.log(payload)
            let ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?limit=1&api_key=' + payload.key);
            ccStreamer.onopen = function onStreamOpen() {
                let subRequest = {
                    "action": "SubAdd",
                    "subs": ["2~Coinbase~" + payload.name + "~USD"]
                };
                ccStreamer.send(JSON.stringify(subRequest));
            }

            ccStreamer.onmessage = function onStreamMessage(event) {
                let result = event.data;
                result = JSON.parse(result)
                // console.log(result)
                if(parseInt(result.TYPE) === 2) {
                    console.log(result)
                    ctx.state.wsTickers.push(result)
                    ccStreamer.close()
                }
                setTimeout(() => {
                    ccStreamer.close()
                },5000)
            }
        }
    }
}
