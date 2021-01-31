<template>
  <div id="login">
    
    <form>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="email" class="form-control" id="username" placeholder="用户名" v-model="user.username">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" id="password" placeholder="密码" v-model="user.password">
      </div>
      <button type="submit" class="btn btn-default" @click='login'>登录</button>
    </form>
  </div>
  
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: 'Login',
    data() {
      return {
        user: {},
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      login() {
        console.log(this.user);
        this.$http.post('http://localhost:9001/userLogin',this.user).then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            // localStorage.clear()
            sessionStorage.clear()
            sessionStorage.setItem('userid',JSON.stringify(res.data.data.userId))
            sessionStorage.setItem('username',JSON.stringify(res.data.data.username))
            sessionStorage['token']=JSON.stringify(res.data.data.token)
            // _this.userToken = 'Bearer ' + res.data.data.body.token;
            // 将用户token保存到vuex中
            // _this.changeLogin({ Authorization: _this.userToken });
            this.$router.push({
              path: '/punchCard'
            })
            alert("登录成功")
          }
        })
      }
  }
  };
</script>


<style scoped>

</style>