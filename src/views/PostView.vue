<template>
    <div class="post">
        <my-input 
            v-model="searchQuery"
            placeholder="Search for a post"
            v-focus
            style="width: calc(100% - 30px);"
        />
        <div class="post_btn">
            <my-button
                style="align-self: flex-start; margin-top: 15px"
                @click="showDialog"
            >
                Created bank
            </my-button>
        </div>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            @edit="editPost"
            v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form
            @create="createPost"
        />
    </my-dialog>
    <my-dialog v-model:show="dialogEditVisible">
        <post-edit-form
            @edit="editPost"
        />
    </my-dialog>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm.vue'
import PostEditForm from '@/components/PostEditForm.vue'
import PostList from '@/components/PostList.vue'
import { useToast } from "vue-toastification";
export default {
    data () {
        return {
            posts: [],
            searchQuery: '',
            isPostsLoading: false,
            dialogVisible: false,
            dialogEditVisible: false,
            edit_post_id: '',
            postLength: 0,
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        showEditDialog() {
            this.dialogEditVisible = true;
        },
        createPost(post) {
            for (let key in post) {
                if (post[key] === '') {
                    switch(key){
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
            }
            if ((Number(post.maximum_loan) / 100 * 20) > post.minimum_down_payment) {
                useToast().error('Minimum down payment must be less than 20% of maximum loan');
                return;
            }
            console.log((Number(post.minimum_down_payment)));
            axios.post('http://192.168.1.17:4200/posts/', post)
                .then(response => {
                    this.dialogVisible = false;
                    this.posts.push(response.data);
                    this.$emit('created', response.data);
                    useToast().success('Post created');
                })
                .catch(error => {
                    console.log(error);
                    console.log(post.name, Date.now())
                })
        },
        removePost(post) {
            axios.delete(`http://192.168.1.17:4200/posts/${post.id}`)
                .then(response => {
                    this.posts = this.posts.filter(p => p.id !== post.id);
                    this.$emit('remove', response.post);
                    useToast().success('Post removed');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        editPost(post) {
            if (post.id !== ''){
                self.edit_post_id = post.id;
            }
            if (this.showEditDialog) {
                this.dialogEditVisible = true;
                if (post.dialogEditVisible === false) {
                    delete post.dialogEditVisible;
                    axios.put(`http://192.168.1.17:4200/posts/${self.edit_post_id}`, post)
                        .then(response => {
                            this.dialogEditVisible = false;
                            this.posts = this.posts.map(p => {
                                if (p.id === response.data.id) {
                                    return response.data;
                                }
                                return p;
                            });
                            this.$emit('edit', response.data);
                            useToast().success('Post edited');
                        })
                        .catch(error => {
                        console.log(error);
                        })
                }
            }
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('http://192.168.1.17:4200/posts/');
                this.posts = response.data;
                this.postLength = response.data.length;
            } catch (error) {
                console.log(error);
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('http://192.168.1.17:4200/posts/',);
                if (response.data.length > this.postLength) {
                    this.posts = this.posts.concat(response.data);
                    this.postLength = response.data.length;
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.isPostsLoading = false;
            }
        },
        mounted() {
            this.fetchPosts();
        },
    },
    components: {
        PostForm,
        PostEditForm,
        PostList
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    }
}
</script>

<style>

.post {
    display:  flex;
    justify-content: center;
    flex-direction: column;
}

.post_btn {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

</style>