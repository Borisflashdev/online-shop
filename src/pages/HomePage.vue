<template>
    <div>
        <div>
            <base-filter @productsData="getFilteredData" :page="this.$route.params.page"></base-filter>
            <div class="row justify-content-center">
                <div class="card m-3 mt-4" style="width: 18rem;" v-for="product in productsData" :key="product.product_id">
                    <img :src="product.img" class="card-img-top" alt="product_image">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">Price: {{ product.price }}$</p>
                        <a href="#" class="btn btn-primary" @click="getDetails(product)">More</a>
                    </div>
                </div>
            </div>
        </div>
        <base-pagination v-if="this.showPagination" @sendPage="sendPage()"></base-pagination>
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
            productsData: [],
            showPagination: false
        }
    },
    computed: {
        numPages() {
            return parseInt(localStorage.getItem('pagesNum'));
        }
    },
    methods: {
        async getAllproducts() {
            this.showPagination = false;

            if (!localStorage.getItem('price')) {
                localStorage.setItem('price', 'price');
            }
            if (!localStorage.getItem('category')) {
                localStorage.setItem('category', 'category');
            }
            if (!localStorage.getItem('author')) {
                localStorage.setItem('author', 'author');
            }
            if (!localStorage.getItem('language')) {
                localStorage.setItem('language', 'language');
            }
            if (!localStorage.getItem('sortBy')) {
                localStorage.setItem('sortBy', 'product_id');
            }
            if (!localStorage.getItem('search')) {
                localStorage.setItem('search', '^');
            }

            const config = {
                headers: {
                    price: localStorage.getItem('price'),
                    category: localStorage.getItem('category'),
                    author: localStorage.getItem('author'),
                    language: localStorage.getItem('language'),
                    sort: localStorage.getItem('sortBy'),
                    search: localStorage.getItem('search'),
                    page: this.$route.params.page
                }
            };

            try {
                const responseData = await axios.get('http://localhost:5005/api/v1/products', config);
                const data = []
                for (const id in responseData.data.result) {
                    data.push({
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
                this.productsData = data;
                localStorage.setItem('pagesNum', responseData.data.pagesNum);
                this.showPagination = true;
            } catch (error) {
                console.log(error);
            }
        },
        getFilteredData() {
            this.getAllproducts();
        },
        sendPage() {
            this.getAllproducts();
        },
        getDetails(data) {
            const productId = data.product_id;
            this.$router.push(`/product/${productId}`);
        }
    },
    created() {
        this.getAllproducts();
    }
}
</script>

<style scoped>
.lnk {
    cursor: pointer;
}
.active-lnk {
    color: white;
    background-color: #0d6efd;
}
</style>