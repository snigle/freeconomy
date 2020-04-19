<template>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="../img/logoa.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Freeconomy
      </a>
      <slot></slot>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component({})
export default class Login extends Vue{
    
}
</script>