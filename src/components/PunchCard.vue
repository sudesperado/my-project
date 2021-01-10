<template>
    <div id="PunchCard">
        <el-select v-model="value" placeholder="请选择" @click.native='getOption'>
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: 'PunchCard',
        data() {
            return {
                option: [], value: ''
            }
        },
        methods: {
            login() {
                _this = this;
                console.log(this.user);
                this.$http.get('').then((res) => {
                    console.log(res.data)
                    this.user = res.data;
                })
            },
            getOption() {
                for (let index = 1; index < 56; index++) {
                    this.option.push({value:index,label:index});
                }
            }
        },
        components: {},
        created() {

        }
    }
</script>

<style>


</style>