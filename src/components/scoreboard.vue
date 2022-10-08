<template>
    <div class="scoreboard p-4 mt-6 mb-4 rounded-lg bg-white">
        <div class="scoreboard__group mb-3">
            <label class="text-gray-700 text-xs" for="board_search">Тикер</label>
            <input v-model="tickerSearch" id="board_search" type="text" class="scoreboard__input w-full border border-gray-300 rounded-md bg-white color-gray-500" placeholder="Например DOGE">
        </div>

        <button class="scoreboard__btn bg-indigo-600 text-white shadow-sm rounded-lg py-2 px-6 hover:bg-indigo-700">Добавить</button>
    </div>
</template>

<script>
export default {
    name: "scoreboard",
    data() {
        return {
            tickerSearch: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.scoreboard {
    &__group {
        position: relative;
        label {
            position: absolute;
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
