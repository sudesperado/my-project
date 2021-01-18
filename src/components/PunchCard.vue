<template>
    <div id="PunchCard">
        <!-- <el-select v-model="value" placeholder="请选择" @click.native='getOption'>
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->
        <button @click ='plus'>+</button>
        {{ input }}
        <button @clicik ='sub'>-</button>
        <br>

        <input v-model="date" @click='getDate' placeholder="日期" value="date">

        <el-calendar v-model="date" v-if='flag'></el-calendar>

    </div>
</template>

<script>
    export default {
        name: 'PunchCard',
        data() {
            return {
                option: [], value: '',
                input: '1',
                flag:false,
                date:new Date()
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
            },
            plus(){
                var _this = this;
              _this.input++;
        
            },
            sub(){
                var _this = this;
                if(_this.input>=2){
                    _this.input--;
                }else{
                    _this.input =1;
                }
            },
            getDate(){
                var _this = this;
                _this.flag = !_this.flag;
            }
        },
        components: {},
        created() {

        }
    }
</script>

<style>


</style>