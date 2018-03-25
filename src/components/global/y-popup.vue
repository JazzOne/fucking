<template>
    <div class="y-popup" :class="typeClass" :value="value" v-show="visible">
        <div class="y-popup-mask" v-show="mask" @click="maskClick">
            <slot name="mask"></slot>
        </div>
        <div class="y-popup-container" :class="{'y-popup-center': center}">
            <div class="y-popup-content" v-if="$slots.default">
                <slot></slot>
            </div>
        </div>
        <!--<p>你可以在这个组件上使用v-model</p>
        <button class="close" @click="close">X</button>-->
    </div>
</template>
<script>
export default {
  name: "y-popup",
  props: {
    type: {
        type: String,
        default: ''
    },
    mask: {
        type: Boolean,
        default: true
    },
    value: {
        type: Boolean,
        default: false
    },
    center: {
        type: Boolean,
        default: true
    },
  },
  computed: {
      typeClass() {
        return this.type ? `y-${this.type}` : '';
      }
  },
  data () {
    return {
        visible: false
    };
  },
  watch: {
    value(val) {
        // console.log('watch value', val);
        this.visible = val;
    },
    visible(val) {
        this.$emit('input', val) ;
    }
  },
  methods: {
      maskClick(e) {
        this.visible = false;
        // this.$emit(EVENT_MASK_CLICK, e)
      }
  },
  mounted() {
    if(this.value) {
        this.visible = true
    }
  }
}
</script>
<style lang="css">
    .y-popup {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
    }
    .y-popup-mask,
    .y-popup-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .y-popup-mask {
        overflow: hidden;
        background-color: rgb(0, 0, 0);
        opacity: 0.5
    }
    .y-popup-mask::before {
        content: ".";
        display: block;
        width: 1px;
        height: 1px;
        background-color: rgba(0, 0, 0, .1);
        margin-left: -10px;
    }
    /*  
     *  将z-index较高的caontainer移开，
     *  以免挡住maskClick事件的触发 
     */
    .y-popup-container {
        transform: translate(100%, 100%)
    }
      
    .y-popup-content {  /* 位于底部 */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        transform: translate(-100%, -100%);
    }
    .y-popup-center .y-popup-content{  /* 居中 */
        position: absolute;
        top: -50%;
        left: -50%;
        width: auto;
        transform: translate(-50%, -50%);
    }
        
        
</style>