<template>
    <div>
        <div class="row justify-content-center">
            <form class="col-8 col-xl-5 border border-3 my-5 rounded-3 p-3 bg-light" @submit.prevent="login">
                <div class="h2 text-center my-3">Login</div>

                <div class="mb-3">
                    <label for="inputUsername" class="form-label">Username</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="inputUsername" 
                        v-model="userName"
                        @click="this.userNameError = false">
                    <div id="usernameHelp" class="form-text text-danger" v-if="userNameError">Please enter a valid Username.</div>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input 
                        :type="passType" 
                        class="form-control" 
                        id="exampleInputPassword1" 
                        v-model="password"
                        @click="this.passwordError = false">
                    <div id="password1Help" class="form-text text-danger" v-if="passwordError">Password must be at least 6 characters.</div>
                </div>
                
                <div class="mb-3">
                    <div class="mt-3">
                        <input class="form-check-input m-1" type="checkbox" value="true" id="flexCheckDefault1" v-model="showPass">
                        <label class="form-check-label" for="flexCheckDefault1">Show Password</label>
                    </div>
                    <div class="form-text text-danger">{{ errorMsg }}</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userName: '',
            password: '',
            showPass: false,
            userNameError: false,
            passwordError: false,
            errorMsg: ''
        }
    },
    computed: {
        passType() {
            if (!this.showPass) {
                return 'password';
            } else {
                return 'text'
            }
        }
    },
    methods: {
        async login() {
            if (this.userName === '') {
                this.userNameError = true;
                return;
            }
            if (this.password.length < 6 || this.password === '') {
                this.passwordError = true;
                return;
            }

            const config = {
                headers:{
                    username: this.userName,
                    password: this.password,
                    first: this.firstName,
                    last: this.lastName
                }
            };

            const data ={
                name: "ignore_data",
            }
            
            try {
                const responseData = await axios.post('http://localhost:5005/api/v1/login', data, config);

                const token = responseData.data.result[0].token;
                const username = responseData.data.result[0].username;

                this.$store.state.token = token;
                this.$store.state.userName = username;

                localStorage.setItem('userId', responseData.data.result[0].user_id);
                localStorage.setItem('token', token);
                localStorage.setItem('userName', username);
                this.$router.replace('/');
            } catch (error) {
                console.log(error);
                this.errorMsg = error.response.data.msg;
            }
        }
    }
}
</script>