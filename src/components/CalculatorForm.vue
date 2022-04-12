<template>
    <form class="form-calculator">
        <label style="float:left;">Initial loan</label>
        <my-input style="border-radius: 1rem; width: 100%; margin-bottom: 1rem;" type="number" v-model="initial_loan" placeholder="Enter initial loan" />
        <label style="float:left;">Down payment</label>
        <my-input style="border-radius: 1rem; width: 100%;" type="number" v-model="down_payment" placeholder="Enter down payment" />
        <select v-model="selected">
            <option disabled value="">Select one of the items</option>
            <option v-for="post in posts" :key="post.id">Bank name: {{ post.name }}; Loan term: {{ post.loan_term }};  ID: {{ post.id }}</option>
        </select>
        <ul>
            <li><span>Monthly payment: {{ calculate() }} <hr></span></li>
            <li><span>Total Interest Paid: {{ interestPaid() }} <hr></span></li>
        </ul>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CalculatorForm',
    data () {
        return {
            initial_loan: '',
            down_payment: '',
            selected: '',
            calculate_value: 0,
            selected_id: 0,
            select_post: [],
            posts: []
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('http://192.168.1.17:4200/posts/');
                this.posts = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        selectPost() {
            this.select_post = this.posts.filter(post => post.id == this.selected_id)[0];
        },
        calculate() {
            if (this.selected.indexOf('ID:')) {
                this.selected_id = this.selected.split('ID:')[1];
                this.selectPost();
            }
            if (this.down_payment >= (this.select_post?.minimum_down_payment)) {
                this.calculate_value = this.initial_loan / (((( 1 + ( this.select_post?.interest_rate/ 100 / 12)) ** this.select_post?.loan_term) - 1) / ((this.select_post?.interest_rate / 100 / 12) * (1 + ( this.select_post?.interest_rate / 100 / 12)) ** this.select_post?.loan_term));
                return this.calculate_value.toFixed(2);
            } else {
                return 'You can take down payment';
            }
        },
        interestPaid() {
            let temp_value =  this.calculate_value * this.select_post?.loan_term - this.initial_loan;
            return temp_value.toFixed(2);
        }
    },
    mounted: function() {
        this.fetchPosts();
    }
}
</script>

<style>

.form-calculator {
    margin: 5rem;
    color: #fff;
}

.form-calculator span {
    display: block;
    float: left;
    margin-top: 1rem;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
}

.form-calculator select {
    float: right;
    border: 1px solid #fff;
    border-radius: 1rem;
}

.form-calculator select {
    margin: 1rem;
    width: 10.5rem;
}

.form-calculator ul {
    display: flex;
    flex-direction: column;
}

.form-calculator li {
    list-style: none;
}

</style>