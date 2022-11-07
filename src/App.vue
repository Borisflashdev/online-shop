<template>
<div>
    <base-nav-bar></base-nav-bar>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
    <base-footer></base-footer>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import BaseNavBar from './components/ui/BaseNavBar.vue';
import BaseFooter from './components/ui/BaseFooter.vue';

export default {
  components: {
    BaseNavBar,
    BaseFooter
  }
}
</script>

<style>
.link-div {
  display: flex;
  justify-content: space-evenly;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>