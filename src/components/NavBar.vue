<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/post">Post</router-link> |
    <router-link to="/calculator">Calculator</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {

}
</script>

Nav
<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>