<template>
    <div class="flex items-end h-72 bg-white border rounded-lg p-5">
        <span v-for="(price, key) in prices" :key="key" :style="{'height': price + '%'}"
              class="block bg-yellow-300 m-0.5 w-8"></span>
    </div>
</template>

<script>
export default {
    props: {
        prices: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    name: "dashBoard",
    data() {
        return {

        }
    },
    computed: {

    }
}
</script>

<style scoped>

</style>
