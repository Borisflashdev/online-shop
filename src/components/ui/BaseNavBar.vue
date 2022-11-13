<template>
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ modalDatas.title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">{{ modalDatas.text }}</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="modalDatas.btnTitle === 'Logout'" @click="logout">{{ modalDatas.btnTitle }}</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else>{{ modalDatas.btnTitle }}</button>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">
                    <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                </router-link>
                <router-link class="navbar-brand" to="/">Book Store</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/aboutus">About Us</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link v-if="!this.$store.getters.isAuthenticated" class="nav-link active" aria-current="page" to="/signup">Signup</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link v-if="!this.$store.getters.isAuthenticated" class="nav-link active" aria-current="page" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="this.$store.getters.isAuthenticated">
                    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <font-awesome-icon icon="fa-solid fa-user" /> {{ userName }}
                    </a>
                    <ul class="dropdown-menu">
                        <li><router-link class="dropdown-item" aria-current="page" to="/cart">Cart</router-link></li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item cursor" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal" 
                            @click="modalData('Logout')">Logout</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search Book" aria-label="Search" v-model="searchFilter">
                    <button class="btn btn-primary" type="submit" @click="setSearch()">Search</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import axios from 'axios'

export default {
    data() {
        return {
            searchFilter: localStorage.getItem('searchName'),
            modalDatas: {}
        }
    },
    computed: {
        userName() {
            return this.$store.state.userName;
        }
    },
    methods: {
        setSearch() {
            const search = this.searchFilter;
            localStorage.setItem('search', `^${search}`);
            localStorage.setItem('searchName', `${search}`);
            this.$router.push('/home/1');
        },
        logout() {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            this.$router.push('/home/1');
            location.reload();
        },
        modalData(type) {
            if (type === 'Logout') {
                this.modalDatas = {
                    title: 'Logout',
                    text: 'Are you sure you want to log out?',
                    btnTitle: type,
                    method: 'this.logout()'
                }
            }
        }
    }
}
</script>

<style scoped>
.cursor {
    cursor: pointer;
}
</style>