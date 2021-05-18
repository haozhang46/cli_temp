<template>
    <div>
        <a-modal
            width="45vw"
            title="下载历史"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="localHandleOk"
            @cancel="localHandleCancel"
            okText="确定"
            cancelText="取消"
            zIndex="130"
        >
            <Empty v-if="tableData.length <=0"/>
            <a-table
                v-if="tableData.length>0"
                size="default"
                rowKey="key"
                :columns="columns"
                :data-source="tableData"
                :pagination="false"
            />
        </a-modal>
    </div>
</template>
<script>
import DepartmentSearchTree from '@/localComponents/bizComponents/DepartmentSearchTree'
import UserSearch from '@/localComponents/bizComponents/UserSearch'
import Empty from '@/localComponents/Components/Empty/index'
import moment from 'moment'
import { getDownLog } from '@/api/fs-services'
const commonAlign = { align: 'center' }
const addBtnIcon = require('@/assets/icon/addBtnIcon.png')
export default {
  name: 'DownLoadHistory',
  components: { DepartmentSearchTree, UserSearch, Empty },
  data () {
    return {
      isUserType: false,
      optionTarget: [],
      addBtnIcon,
      form: this.$form.createForm(this),
      confirmLoading: false,
      userOptions: [{ value: 1, title: 1, key: 1 }],
      tableData: [],
      columns: [
        {
          title: '文件名',
          dataIndex: 'name',
          ...commonAlign
          // customRender: (t, r, index) => {
          //   return index + 1
          // }
        },
        {
          title: '下载用户',
          dataIndex: 'user',
          ...commonAlign,
          scopedSlots: { customRender: 'AuthTargetSelect' }
        },
        {
          title: '下载时间',
          dataIndex: 'time',
          ...commonAlign,
          customRender: (t, r, index) => {
            return moment(t).format('YYYY-MM-DD HH:mm:ss')
          }
        }
        // {
        //   title: '操作',
        //   dataIndex: 'opt',
        //   scopedSlots: { customRender: 'opt' },
        //   ...commonAlign
        // }
      ]
    }
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: () => ''
    },
    handleOk: {
      type: Function,
      default: () => {}
    },
    handleCancel: {
      type: Function,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
      localHandleOk () {
          this.handleOk()
      },
      localHandleCancel () {
          console.log('localHandleCancel')
          this.handleCancel()
      }
  },
  watch: {
    visible () {
      console.log('record', this.record)
      getDownLog({ id: this.record })
        .then((e) => {
          console.log(e)
          this.tableData = e
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  mounted () {
      // console.log('record', this.record)
      getDownLog({ id: this.record })
        .then((e) => {
          console.log(e)
          this.tableData = e
        })
        .catch((e) => {
          console.log(e)
        })
  }
}
</script>

<style lang="less" scoped>
</style>
