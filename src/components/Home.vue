<template>
    <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <!-- <template slot="title"><i class="el-icon-message"></i>Blog</template> -->
        <button type="submit" class="btn btn-default" >Blog</button>
      </el-submenu>
      <el-submenu index="2">
        <!-- <template slot="title"><i class="el-icon-menu"  @click='toPunchCard'></i>PunchCard</template> -->
        <button type="submit" class="btn btn-default" @click='toPunchCard'>PunchCard</button>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <button type="submit" class="btn btn-default" @click='loginOut'>退出</button>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{username}}</span>
    </el-header>

  </el-container>
</el-container>
</template>

<script>
export default {
    name: "Home",
     data() {
      return {
       username: localStorage.getItem('username')
      }
    },
    methods:{
        loginOut(){
         this.$http.post('http://localhost:9001/loginOut').then((resp)=>{
            if (resp.data.code === 200) {
             localStorage.clear()
             console.log('退出成功')
            this.$router.push({
              path: '/login'
            })
            }
         })
        },
        toPunchCard(){
            this.$router.push({
                path:'/punchCard'
            })
        },
        toBlog(){
            this.$router.push({
                path:'/blog'
            })
        }
    }
}
</script>

<style scoped>
 .el-header {
    background-color: #9e9fa0;
    color: rgb(17, 17, 17);
    line-height: 60px;
  }
  
  .el-aside {
    color: rgb(20, 2, 2);
  }
</style>