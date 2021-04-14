<template>
  <div id="cart_total">
    <div class="cart_check" @click="checkClick">
      <cart-check-button ref="checkButtonRef" class="button"
                         :isChecked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="calc">总计：{{totalPrice}}</div>
    <div class="buy" @click="calcClick">去购买({{checkLength}})</div>
  </div>
</template>

<script>
  import CartCheckButton from './CartCheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartButtonBar",
    components: {
      CartCheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => item.checked)
          .reduce((prevValue, nextValue) => {
            return prevValue + nextValue.price * nextValue.count
          }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false;

        // return !(this.cartList.filter(item => !item.checked).length)
        // return !this.cartList.find(item => !item.checked)
        return this.cartList.every(item => item.checked);
      }
    },
    methods: {
      checkClick() {
        // if (this.isSelectAll) { // 全部选中
        //   this.cartList.forEach(item => item.checked = false);
        // } else { // 部分或全部不选中
        //   )this.cartList.forEach(item => item.checked = true;
        // }
        this.isSelectAll ? this.cartList.forEach(item => item.checked = false)
          : this.cartList.forEach(item => item.checked = true)
      },
      calcClick() {
        if (this.checkLength === 0) {
          this.$toast.show('请添加需要购买的商品')
        } else if (!this.isSelectAll) {
          this.$toast.show('选择了' + this.checkLength + '件商品, 共计' + this.totalPrice + '元');
        } else {
          this.$toast.show('选择了' + this.checkLength + '件商品, 共计' + this.totalPrice + '元');
        }
      }
    }
  }
</script>

<style scoped>
  #cart_total {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0px;
    display: flex;
    height: 40px;
  }

  .cart_check {
    display: flex;
  }

  .cart_check span {
    line-height: 40px
  }

  .cart_check .button {
    flex: 1;
  }

  .calc {
    flex: 1;
    line-height: 40px;
    margin-left: 20px;
  }

  .buy {
    width: 5rem;
    background-color: #f03;
    color: white;
    line-height: 40px
  }
</style>
