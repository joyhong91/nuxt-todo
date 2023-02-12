<template>
  <div>
    <todo-dashboard />
    <todo-input />
    <todo-list />
    <todo-list-dialog />
  </div>
</template>
<script>
export default {
  middleware: ['auth']
}
</script>



