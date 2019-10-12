<template>
  <a-layout>
    <a-layout-sider>
      <div class="logo">
        <img src="./../static/logo.png" alt="OneMachine logo">
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/machines">
            <a-icon type="laptop" />
            <span>Máquinas</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/commands">
            <a-icon type="interation" />
            <span>Commandos</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="top-bar" />
      <a-layout-content class="content">
        <!-- CONTENT HERE -->
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="sass">
html
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*,
*:before,
*:after
  box-sizing: border-box
  margin: 0

.logo
  margin: 16px
  width: 160px
  img
    width: 160px

.top-bar
  background: #FFF
  padding: 0
  > span
    position: absolute
    right: 20px
    top: 10px

.content
  min-height: 100vh
  padding: 20px
</style>
