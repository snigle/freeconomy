<template>
    <div class="list-group">
        <div class="list-group-item" v-for="category in $store.state.categories" v-bind:key="category.UUID">
            {{category.Name}}
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
@Component({})
export default class Categories extends Vue {
}
</script>