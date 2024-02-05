<template>
    <div class="ParentComponent">
        <div class="ParentComponent-descr">
            Select a block, press CTRL+C to copy its color, then on it, or on another block, press CTRL+V to paste the
            copied color
        </div>

        <div class="ParentComponent-blocks">
            <div class="ParentComponent-block ParentComponent-one" tabindex="0" data-color="blue" @click="onBlockClick">
                <div class="ParentComponent-header blue-text">BLUE</div>
                <div class="ParentComponent-log">
                    <div class="ParentComponent-log-title">Copy history:</div>
                    <div class="ParentComponent-log-body">
                        <div
                            class="ParentComponent-logItem"
                            :class="item"
                            v-for="(item, index) in logs.blue"
                            :key="index"
                        />
                    </div>
                </div>
            </div>

            <div class="ParentComponent-block ParentComponent-two" tabindex="0" data-color="red" @click="onBlockClick">
                <div class="ParentComponent-header red-text">RED</div>
                <div class="ParentComponent-log">
                    <div class="ParentComponent-log-title">Copy history:</div>
                    <div class="ParentComponent-log-body">
                        <div
                            class="ParentComponent-logItem"
                            :class="item"
                            v-for="(item, index) in logs.red"
                            :key="index"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="ParentComponent-clipboard">
            <div class="ParentComponent-clipboard-title">Copied color:</div>
            <div v-if="clipboard" class="ParentComponent-logItem" :class="{ [clipboard]: true }"></div>
        </div>

        <button @click="onDestroy">.destroy()</button>
    </div>
</template>

<script lang="ts">
import HotKeysController from '../utils/HotKeysController';

export default {
    name: 'ParentComponent',
    data() {
        return {
            actions: [
                {
                    hotKey: 'CTRL+C',
                    // bind здесь делать не обязательно, он тут только для передачи аргумента hotKey
                    callback: this.onCopy.bind(this, 'CTRL+C')
                },
                {
                    hotKey: 'CTRL+V',
                    // вариант передачи hotKey без bind
                    callback: e => this.onPaste('CTRL+V', e)
                }
            ],
            hotKeysController: new HotKeysController({ autoEnable: false, tabindex: 0 }),

            logs: {
                blue: [],
                red: []
            },
            clipboard: null
        };
    },
    methods: {
        onBlockClick(e) {
            const block = e.target.closest('.ParentComponent-one, .ParentComponent-two');
            block.focus();
        },

        onCopy(hotKey, e) {
            this.$emit('action', hotKey);

            const color = e.target.dataset.color ?? null;
            this.clipboard = color;
        },
        onPaste(hotKey, e) {
            this.$emit('action', hotKey);

            if (!this.clipboard) return;
            const color = e.target.dataset.color;

            this.logs[color].push(this.clipboard);
        },
        onDebug(debugData) {
            this.$emit('debug', debugData);
        },
        onDestroy() {
            this.hotKeysController.destroy();
        }
    },
    mounted() {
        this.hotKeysController.toggleDebug(true);

        // Дожидаемся монтирования компонента, и потом уже задаем экшны и активируем прослушивание
        // клавиатурных событий на корневом элементе своего компонента
        this.hotKeysController.setActions(this.actions).enable(this);

        this.hotKeysController.on('debug', this.onDebug);

        window.HotKeysController = this.hotKeysController;
    },
    beforeDestroy() {
        // Обнуляем все опции и экшны, что должно помочь сборщику мусора подчистить данные
        this.hotKeysController.off('debug', this.onDebug);
        this.hotKeysController.destroy();
    }
};
</script>

<style lang="sass" scoped>
.ParentComponent
    &-blocks
        display: flex
        gap: 8px
        margin: 16px 0
    &-one, &-two
        width: 100%
        flex-shrink: 1
        min-height: 100px
        border: 1px solid #ddd
        padding: 16px
        cursor: pointer
    &-one
        &:focus
            outline: 1px solid #00f
    &-two
        &:focus
            outline: 1px solid #f00
    &-header
        text-align: center
    &-log-body
        display: flex
        flex-wrap: wrap
        gap: 4px
    &-logItem
        width: 10px
        height: 10px

    &-clipboard
        &-title
            padding-right: 8px
        display: flex
        align-items: center

    .blue
        background-color: #00f
    .blue-text
        color: #00f
    .red
        background-color: #f00
    .red-text
        color: #f00
</style>
