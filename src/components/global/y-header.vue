<template>
    <div class="y-header">
        <div class="y-header-left">
            <slot name="left"></slot>
        </div>
        
        <span class="y-header-title" v-if="$slots.default">
            <slot>
                <span v-show="title">{{title}}</span>
            </slot>
        </span>
        <div class="y-header-area" v-if="!title || !$slots.default">
            <slot name="area"></slot>
        </div>

        <div class="y-header-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: "y-header",
  props: {
    title: String
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="css" scoped>
    .y-header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        text-align: center;
        height: 70px;
    }
    .y-header .y-header-title {
        line-height: 70px;
        font-size: 30px;
    }
    .y-header .y-header-area {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .y-header .y-header-left,
    .y-header .y-header-right {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 60px;
        /*line-height: 70px;*/
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .y-header .y-header-left {
        left: 0;
    }
    .y-header .y-header-right {
        right: 0;
    }
</style>