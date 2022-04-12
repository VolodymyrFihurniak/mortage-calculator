<template>
  <div class="post">
    <div>
        <div><strong>Bank name:</strong> {{ post.name }}</div>
        <div><strong>Interest rate:</strong> {{ post.interest_rate }}</div>
        <div><strong>Maximum loan:</strong> {{ post.maximum_loan }}</div>
        <div><strong>Minimum down payment:</strong> {{ post.minimum_down_payment }}</div>
        <div><strong>Loan term:</strong> {{ post.loan_term }}</div>
    </div>
    <div class="post__btns">
      <ul>
        <li>
          <my-button @click="$emit('edit', post)">
            Edit
          </my-button>
        </li>
        <li>
          <my-button @click="$emit('remove', post)">
            Delete
          </my-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns > ul {
  margin: 0;
  padding: 4px;
}

.post__btns> ul > li {
  display: inline; 
  margin-right: 5px; 
}
</style>