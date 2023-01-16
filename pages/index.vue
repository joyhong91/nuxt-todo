<template>
  <div>
    <todo-input />
    <todo-list />
  </div>
</template>

<script>
  export default {
    middleware: "isAuthenticated"
  };
  </script>
