<template>
  <el-container>
    <el-header height="90px" style="text-align: right; font-size: 30px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <i class=el-icon-menu></i><span> 黄小凯手上有{{money}}枚金币！</span>
      <el-col :span="2">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img class="image" src="./element.png" height="50" alt="标志">
        </el-card>
      </el-col>
    </el-header>

    <el-container>
      <el-main style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-tabs value="first" type="card" stretch>
          <el-tab-pane name="first"><span slot="label"><i class="el-icon-goods"></i> 任务面板</span>
            <el-card class="border-card">
              <el-collapse>
                <el-collapse-item title="主线任务 MainTask" name="1">
                  <div style="height:30px; line-height:30px;">
                    👉 {{tasks.maintask.taskline}}：{{tasks.maintask.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="tasks.maintask.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(tasks.maintask,'maintask')">{{tasks.maintask.money}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(tasks.maintask,'maintask')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="支线任务 SideQuest" name="2">
                  <div v-for="item in tasks.sidequest" style="height:30px; line-height:30px;">
                    👉 {{item.taskline}}：{{item.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="item.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(item,'sidequest')">{{item.money}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item,'sidequest')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="日常任务 Daily" name="3">
                  <div v-for="item in tasks.daily" style="height:30px; line-height:30px;">
                    👉 {{item.taskline}}：{{item.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="item.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(item,'daily')">{{item.money}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item,'daily')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="挑战任务 Challenge" name="4">
                  <div v-for="item in tasks.challenge" v-if="item.belong_to===0" style="height:30px; line-height:30px;">
                    👉 {{item.taskline}}：{{item.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="item.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button v-if="item.isAccepted===1" type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(item,'challenge')">{{item.money}}CNY
                      </el-button>
                      <el-button v-if="item.isAccepted===0" type="primary" icon="el-icon-info" size="mini" plain
                                 @click="acceptChallenge(item)">接受挑战！
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item,'challenge')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="多段任务 Multistage" name="6">
                  <div v-for="item in tasks.multistage" style="height:50px; line-height:20px;">
                    👉 {{item.taskline}}：{{item.title}}
                    <el-button-group style="float:right">
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(item,'multistage')">{{item.money}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item,'multistage')"></el-button>
                    </el-button-group>
                    <el-progress :percentage="item.percentage" :stroke-width='3'></el-progress>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="附加任务 Addition" name="7">
                  <div v-for="item in tasks.addition" style="height:30px; line-height:30px;">
                    👉 {{item.taskline}}：{{item.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="item.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishAdditionTask(item)">{{item.money*count}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item,'addition')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="7">
                  <el-input-number v-model="count" :min="1" label="计数" style="float:right"></el-input-number>
                </el-collapse-item>
                <el-collapse-item v-for="(item,key) in tasks.challenge" :key='key'
                                  v-if="(item.isAccepted==true)&&(item.belong_to==0)" :title="item.title" name="9">
                  <div v-for="(item2,key) in tasks.challenge" :key='key' v-if="item2.belong_to==item.id"
                       style="height:30px; line-height:30px;">
                    👉 {{item2.taskline}}：{{item2.title}}
                    <el-button-group style="float:right">
                      <el-tooltip class="item" effect="dark" :content="item2.content" placement="right-start">
                        <el-button type="primary" size="mini" plain>Tips</el-button>
                      </el-tooltip>
                      <el-button type="primary" icon="el-icon-check" size="mini" plain
                                 @click="finishTask(item2,'challenge')">{{item2.money}}CNY
                      </el-button>
                      <el-button type="primary" icon="el-icon-delete" size="mini" plain
                                 @click="deleteTask(item2,'challenge')"></el-button>
                    </el-button-group>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-tab-pane>
          <el-tab-pane name="second"><span slot="label"><i class="el-icon-setting"></i> 任务添加</span>
            <el-card class="border-card" style="text-align: left;" shadow="hover">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="任务名称" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="任务类型" prop="type">
                  <el-select v-model="ruleForm.type" placeholder="请选择任务类型" @change='selectChange()'>
                    <el-option label="主线任务" value="maintask"></el-option>
                    <el-option label="支线任务" value="sidequest"></el-option>
                    <el-option label="日常任务" value="daily"></el-option>
                    <el-option label="挑战任务" value="challenge"></el-option>
                    <el-option label="多段任务" value="multistage"></el-option>
                    <el-option label="附加任务" value="addition"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属任务" v-if="ruleForm.type==='challenge'">
                  <el-select v-model="ruleForm.belong_to" placeholder="请选择所属">
                    <el-option v-for="(item,key) in tasks.challenge" :key='item.title' :label="item.title"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="ruleForm.type==='multistage'" label="阶段总数">
                  <el-input-number v-model='ruleForm.total_stage' :min='2'></el-input-number>
                </el-form-item>
                <el-form-item label="是否限时" v-if="ruleForm.type==='sidequest'">
                  <el-switch v-model="ctrl.isTimeLimit" :disabled="ctrl.switchDisabled" @change='limitChange()'>
                  </el-switch>
                </el-form-item>
                <el-form-item label="限制时间" prop='date' v-if="ruleForm.type==='sidequest'">
                  <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间" align="right"
                                  :picker-options="pickerOptions1" :disabled="!ctrl.isTimeLimit">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="悬赏金额" prop="money">
                  <el-input-number v-model="ruleForm.money" :min="1" label="赏金"></el-input-number>
                </el-form-item>
                <el-form-item label="任务内容">
                  <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="任务线" prop="taskline">
                  <el-select v-model="ruleForm.taskline" placeholder="请选择任务线" allow-create filterable>
                    <el-option v-for="(item,key) in taskLineOption" :key='key' :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane name="third"><span slot="label"><i class="el-icon-time"></i> 成长记录</span>
            <el-card class="borden-card">
              <el-form :inline="true" :model="formInline" ref="formInline">
                <el-form-item label="描述">
                  <el-input v-model="formInline.description" placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-radio-group v-model="formInline.type">
                    <el-radio-button label="消费"></el-radio-button>
                    <el-radio-button label="赚取"></el-radio-button>
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">补番：2CNY/集<br/>看电影：6CNY/部<br/>睡懒觉：6CNY/小时</div>
                      <el-radio-button label="娱乐"></el-radio-button>
                    </el-tooltip>
                  </el-radio-group>
                </el-form-item>
                <el-input-number v-model="formInline.money" :min='1' label="金额"></el-input-number>
                <el-form-item></el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitRecordForm()">添加</el-button>
                </el-form-item>
              </el-form>
            </el-card>
            <el-card class="borden-card">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="180">
                </el-table-column>
                <el-table-column prop="description" label="描述" width="450">
                </el-table-column>
                <el-table-column prop="money" label="动向">
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>
          <el-tab-pane name="fifth"><span slot="label"><i class="el-icon-document"></i> 计划总览</span>
          </el-tab-pane>
          <el-tab-pane name="forth"><span slot="label"><i class="el-icon-share"></i> 曲线图</span>
            <el-form :inline="true" :model="formInline2" ref="formInline2">
              <el-form-item label="">
                <el-radio-group v-model="formInline2.type">
                  <el-radio-button label="俯卧撑"></el-radio-button>
                  <el-radio-button label="跑步"></el-radio-button>
                  <el-radio-button label="肌肉量"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-input-number v-model="formInline2.num" v-if="formInline2.type==='跑步'" :min='1' :step="0.1"
                               label="里程"></el-input-number>
              <el-input-number v-model="formInline2.num" v-if="formInline2.type==='俯卧撑'" :min='1'
                               label="个数"></el-input-number>
              <el-input-number v-model="formInline2.num" v-if="formInline2.type==='肌肉量'" :min='50' :step="0.1"
                               label="公斤"></el-input-number>
              <el-form-item></el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitChartForm()">添加</el-button>
              </el-form-item>
            </el-form>
            <el-card class="borden-card">
              <el-table :data="chart" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="profit" label="收益" width="180">
                </el-table-column>
                <el-table-column prop="consume" label="消耗" width="180">
                </el-table-column>
                <el-table-column prop="pure_profit" label="纯利">
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
  import VeLine from 'v-charts/lib/line'
  import axios from 'axios';

  export default {
    name: "LeTask",
    components: {VeLine},
    data() {
      return {
        money: '',
        count: '',
        taskLineOption: ['国创', 'AI', '健身', '阅读', '课内', '开发', '杂项', 'test'],
        formInline2: {
          type: '俯卧撑',
          num: '1',
        },
        formInline: {
          description: '',
          money: '',
          type: '消费'
        },
        tableData: [],
        ruleForm: {
          title: '',
          date: '',
          type: '',
          money: '',
          content: null,
          taskline: '',
          total_stage: '',
          belong_to: '',
        },
        rules: {
          title: [{
            required: true,
            message: '请输入任务名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择任务类型',
            trigger: 'change'
          }],
          date: [{
            required: false,
            message: '请选择时间',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请填写任务内容',
            trigger: 'blur'
          }],
          taskline: [{
            required: true,
            message: '请选择任务线',
            trigger: 'blur'
          }]
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天内',
            onClick(picker) {
              const date = new Date();
              date.setTime(new Date(date.toLocaleDateString()).getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '三天内',
            onClick(picker) {
              const date = new Date();
              date.setTime(new Date(new Date().toLocaleDateString()).getTime() + 3600 * 1000 * 24 * 4);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周内',
            onClick(picker) {
              const date = new Date();
              date.setTime(new Date(new Date().toLocaleDateString()).getTime() + 3600 * 1000 * 24 * 8);
              picker.$emit('pick', date);
            }
          }, {
            text: '一个月内',
            onClick(picker) {
              const date = new Date();
              date.setTime(new Date(new Date().toLocaleDateString()).getTime() + 3600 * 1000 * 24 * 31);
              picker.$emit('pick', date);
            }
          }, {
            text: '三个月内',
            onClick(picker) {
              const date = new Date();
              date.setTime(new Date(new Date().toLocaleDateString()).getTime() + 3600 * 1000 * 24 * 93);
              picker.$emit('pick', date);
            }
          }]
        },
        tasks: {
          maintask: '',
          sidequest: [],
          daily: [],
          challenge: [],
          multistage: [],
          addition: [],
        },
        ctrl: {
          switchDisabled: false,
          isTimeLimit: false,
        },
        allSidequest: [],
        chart: [],
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            axios.get("/task/public/addtask", {
              params: {
                form: this.ruleForm,
                type: this.ruleForm.type,
              }
            })
              .then((response) => {
                // this.tasks=response.data;
                if (response.data.log === 'success') {
                  this.$refs['ruleForm'].resetFields();
                  this.$message({
                    message: '任务创建成功！ (๑•̀ㅂ•́)و✧',
                    type: 'success'
                  });
                  this.getRecord();
                  this.getPanel();
                  this.ruleForm.total_stage = 0;
                }
              })
              .catch((response) => {
                console.log(response);
                this.$message.error('怎么又出问题了！ w(ﾟДﾟ)w')
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitRecordForm() {
        axios.get("/task/public/record/new_record", {
          params: {
            form: this.formInline,
          }
        })
          .then((response) => {
            this.$refs['formInline'].resetFields();
            this.$message({
              message: '记录添加成功！ (๑•̀ㅂ•́)و✧',
              type: 'success'
            });
            this.getUserInfo();
            this.getRecord();
          })
          .catch((response) => {
            console.log(response);
            this.$message.error('怎么又出问题了！ w(ﾟДﾟ)w')
          })
      },
      submitChartForm() {
        axios.get("/task/public/charts/set_chart", {
          params: {
            type: this.formInline2.type,
            value: this.formInline2.num,
          }
        })
          .then((response) => {
            this.$refs['formInline2'].resetFields();
            this.$message({
              message: '记录添加成功！ (๑•̀ㅂ•́)و✧',
              type: 'success'
            });
            this.getUserInfo();
            this.getRecord();
          })
          .catch((response) => {
            console.log(response);
            this.$message.error('怎么又出问题了！ w(ﾟДﾟ)w')
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      selectChange() {
        if (this.ruleForm.type === 'maintask') {
          this.rules.date[0].required = false;
          this.ctrl.isTimeLimit = false;
          this.ctrl.switchDisabled = true;
        } else if (this.ruleForm.type === 'sidequest') {
          this.rules.date[0].required = false;
          this.ctrl.switchDisabled = false;
        } else if (this.ruleForm.type === 'daily') {
          this.rules.date[0].required = false;
          this.ctrl.switchDisabled = true;
        } else if (this.ruleForm.type === 'multistage') {
          this.rules.date[0].required = false;
          this.ctrl.switchDisabled = false;
        } else if (this.ruleForm.type === 'challenge') {
          this.rules.date[0].required = false;
          this.ctrl.switchDisabled = false;
        }
      },
      limitChange() {
        this.rules.date[0].required = this.ctrl.isTimeLimit === true;
      },
      getPanel() {
        axios.get("/task/public/panel/get_all_tasks")
          .then((response) => {
            this.tasks = response.data;
            console.log(response.data)
          })
          .catch((response) => {
            // this.tasks.sidequest=response.data.maintask;
            console.log(response)
            // console.log(error);
          })

      },
      getCharts() {
        axios.get("/task/public/charts/get_chart")
          .then((response) => {
            this.chart = response.data;
            console.log(response.data)
          })
          .catch((response) => {
            console.log(response)
          })

      },
      finishTask(task, type) {
        axios.get("/task/public/panel/finish_task", {
          params: {
            type: type,
            id: task.id,
          }
        })
          .then((response) => {
            this.tasks = response.data;
            this.getRecord();
            this.getUserInfo();
            console.log(response.data)
            this.$notify({
              title: '完成任务！',
              message: '黄小凯获得了' + task.money + '枚金币 ♪(^∇^*)',
              type: 'success'
            });
          })
          .catch((response) => {
            // this.tasks.sidequest=response.data.maintask;
            console.log(response)
            // console.log(error);
          })
      },
      finishAdditionTask(task) {
        axios.get("/task/public/panel/finish_addition_task", {
          params: {
            id: task.id,
            count: this.count,
          }
        })
          .then((response) => {
            this.tasks = response.data;
            this.getRecord();
            this.getUserInfo();
            console.log(response.data)
            this.$notify({
              title: '完成任务！',
              message: '黄小凯获得了' + task.money * this.count + '枚金币 ♪(^∇^*)',
              type: 'success'
            });
          })
          .catch((response) => {
            // this.tasks.sidequest=response.data.maintask;
            console.log(response)
            // console.log(error);
          })
      },
      deleteTask(task, type) {
        axios.get("/task/public/panel/delete_task", {
          params: {
            type: type,
            id: task.id,
          }
        })
          .then((response) => {
            this.tasks = response.data;
            console.log(response.data)
            this.$message({
              message: '哎呀怎么删了呢 (￣_,￣ )',
              type: 'warning'
            });
          })
          .catch((response) => {
            // this.tasks.sidequest=response.data.maintask;
            console.log(response)
            this.$message.error('怎么又出问题了！ w(ﾟДﾟ)w')

          })
      },
      getRecord() {
        axios.get("/task/public/record/get_last_history")
          .then((response) => {
            this.tableData = response.data;
            console.log(response.data)
          })
          .catch((response) => {
            console.log(response)
          })
      },
      getUserInfo() {
        axios.get("/task/public/panel/get_user_info")
          .then((response) => {
            this.money = response.data.money;
            console.log(response.data)
          })
          .catch((response) => {
            console.log(response)
          })
      },

      acceptChallenge(item) {
        axios.get("/task/public/panel/accept_challenge", {
          params: {
            id: item.id
          }
        })
          .then((response) => {
            this.getPanel();
            console.log(response.data)
            this.$notify({
              title: '接受挑战！',
              message: '黄小凯接受了一个挑战 (๑•̀ㅂ•́)و✧',
              type: 'warning'
            });
          })
          .catch((response) => {
            console.log(response)
          })
      },
    },
    mounted() {
      this.getRecord();
      this.getPanel();
      this.getUserInfo();
      this.getCharts();
    },
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #C0C4CC;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
