<template>
    <div class="container">
        <Scoreboard/>
        <BlockTickers/>
    </div>
</template>

<script>
import Scoreboard from './components/scoreboard.vue'
import BlockTickers from './components/blockTickers.vue'

export default {
    name: 'App',
    components: {
        Scoreboard,
        BlockTickers,
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">

</style>
