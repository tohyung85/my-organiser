<style>
.sidebar {
  float: left;
  width: 300px;
  height:100vh;
  background: #353b40;
  color:white;
  -webkit-transition: width .5s ease;
  transition: width .5s ease;
}

.sidebar.shrink {
  width: 50px;
}

.close-button {
  float:right;
}

.clear-float {
  clear: both;
}

</style>


<template>
  <div class="page-wrapper">
    <div @click="expanded=true" v-bind:class="[!expanded ? shrinkClass : '' , 'sidebar']">
      <div v-show="expanded" @click.stop="expanded=false" class="btn btn-primary close-button">Close</div>
      <br class="clear-float"/>
      <slot></slot>
    </div>
    <div class="content-wrapper">
      <slot name="main-content"></slot>
    </div>
  </div>
</template>
<script>
  /* ============
   * Sidebar Component
   * ============
   *
   * Render sidebar here
   */

  export default {
    name: 'sidebar-component',

    data() {
      return {
        expanded: false,
        shrinkClass: 'shrink',
      };
    },

    // methods: {
    //   toggleSidebar() {
    //     console.log('toggle sidebar', this.expanded);
    //   },
    // },
  };
</script>
