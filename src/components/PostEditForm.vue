<template>
  <form @submit.prevent="checkForm">
    <h1>Edit blank bank</h1>
    <my-input
      v-focus
      v-model="post.name"
      type="text"
      placeholder="Bank name"
    />
    <my-input
      v-model="post.interest_rate"
      v-focus
      type="text"
      placeholder="Interest rate"
    />
    <my-input
      v-model="post.maximum_loan"
      v-focus
      type="text"
      placeholder="Maximum loan"
    />
    <my-input
      v-model="post.minimum_down_payment"
      v-focus
      type="text"
      placeholder="Minimum down payment"
    />
    <my-input
      v-model="post.loan_term"
      v-focus
      type="text"
      placeholder="Loan term"
    />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="editPost"
    >
      Edit
    </my-button>
  </form>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
    data() {
        return {
            name: 'post-edit-form',
            post: {
                id: '',
                name: '',
                interest_rate: '',
                maximum_loan: '',
                minimum_down_payment: '',
                loan_term: '',
                dialogEditVisible: false,
            },
        }
    },
  methods: {
    editPost() {
        for (let key in this.post) {
            if (this.post[key] === '') {
                switch(key){
                    case 'id':
                        continue;
                    case 'name':
                        useToast().error('Please enter bank name');
                        break;
                    case 'interest_rate':
                        useToast().error('Please enter interest rate');
                        break;
                    case 'maximum_loan':
                        useToast().error('Please enter maximum loan');
                        break;
                    case 'minimum_down_payment':
                        useToast().error('Please enter minimum down payment');
                        break;
                    case 'loan_term':
                        useToast().error('Please enter loan term');
                        break;
                }
                return;
            }
            this.$emit('edit', this.post);
        }
        if ((Number(this.post.maximum_loan) / 100 * 20) > this.post.minimum_down_payment) {
          useToast().error('Minimum down payment must be less than 20% of maximum loan');
          return;
      }
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>