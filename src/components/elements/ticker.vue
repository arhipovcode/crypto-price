<template>
    <div class="flex flex-col border border-gray-300 rounded-lg py-4 px-5 bg-white">
        <div class="flex justify-between items-center">
            <span class="ticker-name text-gray-900 text-sm uppercase">{{ settings.name }}</span>
            <span class="remove_icon bg-gray-400 hover:bg-gray-700 cursor-pointer"></span>
        </div>
        <h2 class="text-gray-900 text-3xl uppercase">{{ settings.price }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        settings: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    name: "ticker",
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.remove_icon {
    mask: url("./../../images/Trash.svg") no-repeat center/contain;
    width: 20px;
    height: 20px;
}
</style>
