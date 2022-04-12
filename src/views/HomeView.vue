<template>
  <div class="home">
    <div class="about">
      <h1>With %username% connection</h1>
      <p>This is a project with a test task Mortgage calculator.<br>
        To go to the task check, click on one of the two buttons:</p>
      <div class="buttons">
        <ul>
          <li><my-button @click="$router.push('post')">Post</my-button></li>
          <li><my-button @click="$router.push('calculator')">Calculator</my-button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>

.about {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.home > .about >  p {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.buttons > ul {
  margin: 0;
  padding: 4px;
}

.buttons > ul > li {
  display: inline; 
  margin-right: 5px; 
}

</style>