<template>
    <i v-if="fontClass" :class="iconName" @click="click(iconName)"></i>
    <svg v-else-if="svg" class="icon" aria-hidden="true" @click="click(iconName)">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    export default {
        name: "eIcon",
        props: {
            iconName: {
                type: String,
                required: true
            }
        },
        computed: {
            fontClass() {
                return this.iconName && this.iconName.trim().length > 2 && !this.iconName.startsWith("#");
            },
            svg() {
                return this.iconName && this.iconName.trim().length > 2 && this.iconName.startsWith("#");
            }
        },
        methods: {
            click(iconName) {
                this.$emit('click', iconName)
            }
        }
    }
</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
