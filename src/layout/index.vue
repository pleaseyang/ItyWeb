<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings" :button-top="buttonTop">
        <settings />
      </right-panel>
    </div>
    <!--  防止刷新后主题丢失  -->
    <Theme v-show="false" ref="theme" />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Theme from '@/components/ThemePicker'
import Cookies from 'js-cookie'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Theme
  },
  mixins: [ResizeMixin],
  data() {
    return {
      buttonTop: 200
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.buttonTop = document.body.clientHeight / 2 - 24
    if (Cookies.get('theme')) {
      this.$refs.theme.theme = Cookies.get('theme')
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: Cookies.get('theme')
      })
    }
    if (Cookies.get('tagsView')) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'tagsView',
        value: Cookies.get('tagsView') === 'true'
      })
    }
    if (Cookies.get('sidebarLogo')) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'sidebarLogo',
        value: Cookies.get('sidebarLogo') === 'true'
      })
    }
    if (Cookies.get('supportPinyinSearch')) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'supportPinyinSearch',
        value: Cookies.get('supportPinyinSearch') === 'true'
      })
    }
    if (Cookies.get('fixedHeader')) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'fixedHeader',
        value: Cookies.get('fixedHeader') === 'true'
      })
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
