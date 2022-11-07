<template>
    <div>
        <div>
            <base-filter @productsData="getFilteredData" :page="this.$route.params.page"></base-filter>
            <div class="row justify-content-center">
                <div class="card m-3 mt-4" style="width: 18rem;" v-for="product in dataProduct" :key="product.product_id">
                    <img :src="product.img" class="card-img-top" alt="product_image">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">Price: {{ product.price }}$</p>
                        <a href="#" class="btn btn-primary" @click="getDetails(product)">More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3" v-if="isAllPages"> 
            <nav>
                <ul class="pagination">
                    <li class="page-item" v-if="isActivePrevious">
                        <button class="page-link" disabled>Previous</button>
                    </li>
                    <li class="page-item" v-else>
                        <button class="page-link" @click="selectPage(parseInt(this.$route.params.page) - 1)">Previous</button>
                    </li>
                    <li class="page-item">
                        <a 
                            :class="{'page-link': true, 'lnk': true, 'active-lnk': pageNum === '1'}" 
                            @click="selectPage(1)">1
                        </a>
                    </li>
                    <li class="page-item">
                        <a
                            :class="{'page-link': true, 'lnk': true, 'active-lnk': pageNum === '2'}"  
                            @click="selectPage(2)">2
                        </a>
                    </li>
                    <li class="page-item" v-if="isTwoPages">
                        <a 
                            :class="{'page-link': true, 'lnk': true, 'active-lnk': pageNum === '3'}"  
                            @click="selectPage(3)">3
                        </a>
                    </li>
                    <li class="page-item" v-if="isActiveNext && isTwoPages">
                        <a class="page-link lnk" @click="selectPage(parseInt(this.$route.params.page) + 1)">Next</a>
                    </li>
                    <li class="page-item" v-else-if="!isActiveNext">
                        <a class="page-link" disabled>Next</a>
                    </li>
                    <li class="page-item" v-else-if="!isTwoPages && !disabled">
                        <a class="page-link lnk" @click="selectPageNew(parseInt(this.$route.params.page) + 1)">Next</a>
                    </li>
                    <li class="page-item" v-else-if="!isTwoPages && disabled">
                        <a class="page-link" disabled>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import BaseFilter from '../components/ui/BaseFilter.vue';

export default {
    components: {
        BaseFilter
    },
    data() {
        return {
            productsData: {
                page1: [],
                page2: [],
                page3: []
            },
            active: true,
            disabled: false
        }
    },
    computed: {
        isActivePrevious() {
            if (this.$route.params.page === 1 || this.$route.fullPath === '/home/1') {
                return true;
            } else {
                return false;
            }
        },
        isActiveNext() {
            if (this.$route.params.page === 3 || this.$route.fullPath === '/home/3') {
                return false;
            } else {
                return true;
            }
        },
        isAllPages() {
            if (this.productsData.page2.length === 0 && this.productsData.page3.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        isTwoPages() {
            if (this.productsData.page2.length !== 0 && this.productsData.page3.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        pageNum() {
            if (this.$route.fullPath === '/home/1') {
                return '1';
            } else if (this.$route.fullPath === '/home/2') {
                return '2';
            } else {
                return '3';
            }
        },
        dataProduct() {
            if (this.$route.params.page === '1') {
                return this.productsData.page1;
            } else if (this.$route.params.page === '2') {
                return this.productsData.page2;
            } else {
                return this.productsData.page3;
            }
        }
    },
    methods: {
        async getAllProducts() {
            
            const config = {
                headers: {
                    price: localStorage.getItem('price'),
                    category: localStorage.getItem('category'),
                    author: localStorage.getItem('author'),
                    language: localStorage.getItem('language'),
                    sort: localStorage.getItem('sortBy'),
                    search: localStorage.getItem('search')
                }
            };

            await axios.get('http://localhost:5005/api/v1/products', config).then((responseData) => {
                const page1 = [];
                const page2 = [];
                const page3 = [];
                for (const id in responseData.data.result) {
                    if (parseInt(id) <= 11) {
                        page1.push({
                            author: responseData.data.result[id].author, 
                            nacategoryme: responseData.data.result[id].category,
                            description: responseData.data.result[id].description,
                            img: responseData.data.result[id].img,
                            language: responseData.data.result[id].language,
                            name: responseData.data.result[id].name,
                            price: responseData.data.result[id].price,
                            product_id: responseData.data.result[id].product_id,
                        });
                    }
                    if (11 < parseInt(id) && parseInt(id) <= 23) {
                        page2.push({
                            author: responseData.data.result[id].author, 
                            nacategoryme: responseData.data.result[id].category,
                            description: responseData.data.result[id].description,
                            img: responseData.data.result[id].img,
                            language: responseData.data.result[id].language,
                            name: responseData.data.result[id].name,
                            price: responseData.data.result[id].price,
                            product_id: responseData.data.result[id].product_id,
                        });
                    }
                    if (parseInt(id) > 23) {
                        page3.push({
                            author: responseData.data.result[id].author, 
                            nacategoryme: responseData.data.result[id].category,
                            description: responseData.data.result[id].description,
                            img: responseData.data.result[id].img,
                            language: responseData.data.result[id].language,
                            name: responseData.data.result[id].name,
                            price: responseData.data.result[id].price,
                            product_id: responseData.data.result[id].product_id,
                        });
                    }
                    this.productsData.page1 = page1;
                    this.productsData.page2 = page2;
                    this.productsData.page3 = page3;
                }
            }).catch((err) => {
                console.log(err);
                localStorage.setItem('price', 'price');
                localStorage.setItem('category', 'category');
                localStorage.setItem('author', 'author');
                localStorage.setItem('language', 'language');
                localStorage.setItem('sortBy', 'product_id');
                localStorage.setItem('search', '^');
                location.reload();
            });
        },
        async selectPage(num) {
            await this.$router.push(`/home/${num}`);
        },
        async selectPageNew(num) {
            if (!this.isTwoPages && this.$route.fullPath === '/home/2') {
                this.disabled = true;
                return;
            } else {
                await this.$router.push(`/home/${num}`);
            } 
        },
        getFilteredData() {
            this.getAllProducts();
        },
        isPage(num) {
            if (this.$route.fullPath === `/home/${num}`) {
                return true;
            } else {
                return false;
            }
        },
        getDetails(product) {
            this.$router.push(`/product/${product.product_id}`);
        }
    },
    created() {
        this.getFilteredData();
    }
}
</script>

<style scoped>
.lnk {
    cursor: pointer;
}
.active-lnk {
    /* text-decoration: underline; */
    color: white;
    background-color: #0d6efd;
}
</style>