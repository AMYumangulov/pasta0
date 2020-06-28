<template>
  <div id="students">
    <h2>студенты</h2>
    
  </div>
</template>

<script>
export default {
  name: 'students',
  data: () => {
    return {
      title: '',
      contacts: [{name: 'Denis'},{name: 'Danil'} ],
      description: ''
    }
  }
}
</script>