<template>
  <div class="panel panel-default">
    <div class="panel-heading">一键领取手气最佳红包</div>
    <div class="panel-body">
      <p>饿了么、美团均已失效，感谢大家这段时间以来的支持</p>
      <p><a href="https://github.com/game-helper/hongbao/issues/45" target="_blank">点击这里查看网站统计数据</a></p>
      <button type="button" class="btn btn-danger ali-hongbao-m">支付宝天天领红包</button>
      <div class="ali-hongbao-pc">
        <img src="./static/alihongbao.jpg">
        <p>支付宝天天领红包</p>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import axios from 'axios'
  import ClipboardJS from 'clipboard'
  import domains from './service/domains'

  export default {
    data () {
      return {
        url: '',
        mobile: localStorage.getItem('mobile') || '',
        submit: false,
        domains,
        domain: 0
      }
    },
    mounted () {
      this.aliHongbao()
    },
    methods: {
      async getHongbao () {
        if (this.submit) {
          return
        }
        const {url, mobile, domain} = this
        this.submit = true
        try {
          const {data: {message}} = await axios.post(`${domains[domain]}/hongbao`, {url, mobile})
          alert(message)
        } catch (e) {
          console.error(e)
          alert('服务器繁忙，请稍后重试')
        }
        this.submit = false
        localStorage.setItem('mobile', mobile)
      },
      aliHongbao () {
        const clipboard = new ClipboardJS('.ali-hongbao-m', {
          text: () => 'RY2WVP09sm'
        })
        clipboard.on('success', e => {
          alert('打开支付宝即可领取红包（每天仅一次）')
          e.clearSelection()
        })
        clipboard.on('error', e => {
          if (confirm('您的设备不支持复制红包码，是否跳转到支付宝领取？')) {
            window.location.href = 'https://render.alipay.com/p/f/fd-j6lzqrgm/guiderofmklvtvw.html?shareId=2088012515595090&campStr=p1j%2BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL&sign=wFumSPvgk8JDVbYta9%2FILuhrUmaW%2FpXfsnKt%2FUzDj8o%3D&scene=offlinePaymentNewSns'
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .panel {
    width: 410px;
    margin: 15px auto;
  }

  img {
    width: 100%;
  }

  .ali-hongbao-pc {
    text-align: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;

    p {
      padding-top: 20px;
    }
  }

  .ali-hongbao-m {
    display: none;
  }

  @media screen and (max-width: 480px) {
    .panel {
      width: 100%;
      margin: 0;
      border: 0;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 768px) {
    .ali-hongbao-pc {
      display: none;
    }

    .ali-hongbao-m {
      display: block;
      width: 100%;
      margin-top: 15px;
    }
  }
</style>
