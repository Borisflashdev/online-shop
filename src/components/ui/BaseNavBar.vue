<template>
    <div>
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
                    <router-link class="nav-link active" aria-current="page" to="/signup">Signup</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Account
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Cart</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Logout</a></li>
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

export default {
    data() {
        return {
            searchFilter: localStorage.getItem('searchName')
        }
    },
    methods: {
        setSearch() {
            const search = this.searchFilter;
            localStorage.setItem('search', `^${search}`);
            localStorage.setItem('searchName', `${search}`);
            this.$router.push('/home/1');
        }
    }
}
</script>