<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn {
    background: #42b983;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
</style>