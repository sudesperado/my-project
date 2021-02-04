<template>
    <div id="PunchCard">
        <div id="week">
      <button @click="plus">+</button>
      {{ input }}
      <button @click="sub">-</button>
      <el-button icon="el-icon-search"  @click="searchByWeek" circle></el-button>
        </div>
      <br />
  
      <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="selectRow"
        >
          <el-table-column type="selection" width="50" align="center" ></el-table-column>
          <el-table-column fixed label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column prop="week" label="周" width="150">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.week"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.week }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="period" label="周期" width="300">
            <template slot-scope="scope" @click="this.flag=true">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.period"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.period }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="doThing" label="事情" width="400">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.doThing"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.doThing }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="400">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.remark"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isOver" label="完成" width="120">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.isOver"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.isOver }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="scope.row.show = !scope.row.show">编辑</el-button>
              
              <el-button type="text" size="small" @click="removeData(scope.$index)">删除</el-button>
             
            <el-button class="el-icon-plus" @click.prevent="addRow()"></el-button>
       
          <el-button class="el-icon-minus" @click.prevent="delData(scope.$index)"></el-button>
       
            </div>
          </el-table-column>
        </el-table>
      </div>
  
  <p>
          <el-button type="primary" @click="saveData">提交</el-button>
          <el-button type="primary" @click="clearData">清空</el-button>
        </p>
      
    </div>
  </template>
  
  <script>
  export default {
    name: "PunchCard",
    data() {
      return {
          flag:false,
        value: [],
        input: "1",
        tableData: [
          {
              id:"",
            week: "",
            period: "",
            doThing: "",
            isOver: "",
            remark: ""
          },
        ],
      };
    },
    methods: {
      selectRow(val) {
        this.selectlistRow = val;
      },
      saveData() {
        this.tableData.forEach(item=>{
            item.start = this.value[0];
            item.end = this.value[1];
            item.week = this.input;
        });
        console.log(this.tableData)
        this.$http.post('api/punchCard/save',this.tableData).then((resp)=>{
            console.log(resp)
            alert(resp.data.message)
        })
      },
      plus() {
        var _this = this;
        _this.input++;
      },
      sub() {
        var _this = this;
        if (_this.input >= 2) {
          _this.input--;
        } else {
          _this.input = 1;
        }
      },
      searchByWeek() {
             let list = [ ]
      this.$http.get('api/punchCard/queryAll?week='+this.input).then((resp)=>{
          if(resp.data.code === 200){
              console.log(resp)
              list = resp.data.data
                  list.forEach(element => {
                       console.log(element)
                      element["show"] = false;
                  });
                  this.tableData = list
          }
      })
      },
      handleClick(row) {
        console.log(row);
      },
      addRow() {
        var list = {
          rowNum: "",
          week: "",
          period: "",
          doThing: "",
          isOver: "",
          remark: "",
          start:"",
          end:"",
          show:true
        };
        this.tableData.push(list);
      },
      delData(index) {
        // 删除完数据之后清除勾选框
        this.tableData.splice(index, 1);
      //   this.$refs.tableData.clearSelection();
      },
      removeData(index) {
        this.$confirm(
            "删除本条消息后将不再提示",
            "您确定要删除么?",
            {
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }
        ).then(()=>{
        console.log( this.tableData[index].id)   
        this.$http.get('api/punchCard/del?ids='+this.tableData[index].id).then((resp)=>{
            if(resp.data.code === 200){
                alert(resp.data.message)
            }
        })
        })
      },
       clearData() {
        this.tableData = [],
        this.addRow(),
         console.log(this.tableData)
        this.tableData[0]["show"] = true
         console.log(this.tableData)
      },
    },
    components: {},
    created() {
        let list = [ ]
      this.$http.get('punchCard/queryAll?week='+this.input).then((resp)=>{
          if(resp.data.code === 200){
              console.log(resp)
              list = resp.data.data
                  list.forEach(element => {
                       console.log(element)
                      element["show"] = false;
                  });
                  this.tableData = list
          }
      })
    },
  };
  </script>
  
  <style>
  
  </style>