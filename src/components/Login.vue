<template>
    <div id="login">
        <form>
            <div class="form-group" >
              <label for="username">用户名</label>
              <input type="email" class="form-control" id="username" placeholder="用户名" v-model="user.name">
            </div>
            <div class="form-group" >
              <label for="password">密码</label>
              <input type="password" class="form-control" id="password" placeholder="密码" v-model="user.password">
            </div>
            <button type="submit" class="btn btn-default" @click='login'>登录</button>
          </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data(){
        return{
            user:{},
        }
    },
    methods:{
        login(){
            console.log(this.user);
            this.$http.get('http://localhost:9001/api/login/loginIn?username='+this.user.name+'&password='+this.user.password).then((res)=>{
                console.log(res.data);
                if(res.data.code===200){
                    this.$router.push({
                        path:'/punchCard'
                    })
                }
            })
        }
    },
    components:{},
    created(){

    }
  }
  </script>
  
  
  <style>
    body {
      background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201304%2F18%2F001339jv88x0qs06vo3qq6.jpg&refer=http%3A%2F%2Fattachments.gfan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612885929&t=c446816a69c36e75668c8e180a9176f4');
    }
    
</style>