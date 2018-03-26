<template>
  <div class="y-chart-container">
    <div class="y-chart-title">title</div>
    <div class="y-chart-content">
        <template>
            <echart-line></echart-line>
        </template>
    </div>
  </div>
</template>

<script>
import echartLine from "@/components/complex/echart-line";
export default {
    name: 'y-chart-content',
    components: {
        echartLine
    },
    props: {
        
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
    .y-chart-container {
        display: flex;
        flex-direction: column;
        
    }
    .y-chart-container > div {
        flex-grow: 1;
    }
    .y-chart-container .y-chart-title {
        padding: 20px 27px;
    }
    .y-chart-container .y-chart-content {
        height: 450px;
    }
</style>
