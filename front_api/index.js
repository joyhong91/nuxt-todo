import * as axios from '@nuxtjs/axios';

function fetchTodosByUserId(userId) {
    // console.log(this.$store.state.auth.id,"=======");
    const result =  this.$axios.$get('/getTodosByUserId', {
        userId
    })

    console.log(result);
}

export {fetchTodosByUserId}