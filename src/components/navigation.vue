<template>
  <div id="navigation">
    <div class="navigation">
     <router-link to="/schedule">schedule</router-link>
     <router-link to="/students">students</router-link>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation'
}
</script>

<style scoped>
.navigation {
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 1rem;
  margin: 0 0 3rem 0;

}
  a {
    padding: 1rem;
    text-transform: uppercase;
    text-decoration: none;
    color: blue;
  }
</style>
