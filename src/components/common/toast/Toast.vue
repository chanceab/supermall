<template>
  <transition name="show-toast">
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 1500) {
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    color: #f5f5f5;
    background-color: #8c8c8c;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  .show-toast-enter-active, .show-toast-leave-active {
    transition: all .5s ease;
  }

  .show-toast-enter, .show-toast-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
