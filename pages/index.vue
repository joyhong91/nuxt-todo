<template>
  <div>
    <todo-dashboard/>
    <todo-input />
    <todo-list />
  </div>
</template>

<script>
  export default {
    middleware: "isAuthenticated"
  };
  </script>
