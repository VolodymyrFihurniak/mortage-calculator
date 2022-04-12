<template>
  <form @submit.prevent="checkForm">
    <h1>Created bank</h1>
    <base-tooltip :text="tips.name">
    <my-input
      v-focus
      v-model="post.name"
      type="text"
      placeholder="Bank name"
    />
    </base-tooltip>
    <base-tooltip :text="tips.interest_rate">
    <my-input
      v-model="post.interest_rate"
      v-focus
      type="number"
      placeholder="Interest rate"
    />
    </base-tooltip>
    <base-tooltip :text="tips.maximum_loan">
    <my-input
      v-model="post.maximum_loan"
      v-focus
      type="number"
      placeholder="Maximum loan"
    />
    </base-tooltip>
    <base-tooltip :text="tips.minimum_down_payment">
    <my-input
      v-model="post.minimum_down_payment"
      v-focus
      type="number"
      placeholder="Minimum down payment"
    />
    </base-tooltip>
    <base-tooltip :text="tips.loan_term">
    <my-input
      v-model="post.loan_term"
      v-focus
      type="number"
      placeholder="Loan term"
    />
    </base-tooltip>
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createPost"
    >
      Create
    </my-button>
  </form>
</template>

<script>
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
export default {
  data() {
    return {
        name: 'post-form',
        post: {
            name: '',
            interest_rate: '',
            maximum_loan: '',
            minimum_down_payment: '',
            loan_term: ''
      },
      tips: {
          name: 'Bank name',
          interest_rate: 'Interest rate - the annual percentage rate<br>' +
                         'that expresses the amount of money the bank<br>' + 
                         'charges additionally for the use of assets the<br>' + 
                         'person borrowed money for.',
          maximum_loan: 'Maximum loan - the maximum amount of<br> money a bank' + 
                        'is able to borrow.',
          minimum_down_payment: 'Minimum down payment - the amount of money a<br>' + 
                                'person needs to pay upfront (if a person takes<br>' +
                                'a loan of $300.000 and bank minimum down payment<br>' +
                                'is 20%, it means that person must pay the bank<br>' + 
                                '$60.000 as an initial mortgage payment)',
          loan_term: 'Loan term - a period of time in which a person<br>' + 
                     'must pay off the loan.'
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
    }
  },
  components: {
    BaseTooltip
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>