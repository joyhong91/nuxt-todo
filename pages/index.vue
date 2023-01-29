<template>
  <div>
    <todo-dashboard/>
    <todo-input />
    <todo-list />
    <todo-dialog/>
  </div>
</template>

<script>
  export default {
    middleware: "isAuthenticated"
  };
  </script>
