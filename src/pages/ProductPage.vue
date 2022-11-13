<template>
    <div>
        <p v-if="isFatalError" class="text-dark fs-5 text text-center my-5 mrg">Something went wrong, please try again later.</p>
        <div v-else class="product-details row mt-4 mb-4 justify-content-center mrg">
            <div class="col-8 col-md-3 mb-3">
                <img :src="productData.img" class="img-fluid border border-dark rounded-3" alt="product_img">
            </div>
            <div class="col-8 col-md-5">
                <h2>{{ productData.name }}</h2>
                <p>By {{ productData.author }}</p>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Price
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>{{ productData.price }}$</strong>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Category
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>{{ productData.category }}</strong>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Language
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>{{ productData.language }}</strong>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFourth">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourth" aria-expanded="false" aria-controls="collapseFourth">
                            Description
                        </button>
                        </h2>
                        <div id="collapseFourth" class="accordion-collapse collapse" aria-labelledby="headingFourth" data-bs-parent="#accordionExample">
                        <div class="accordion-body">{{ productData.description }}</div>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="text-dark fs-7">*for all questions and complaints, write to e-mail</p>
                    <button 
                        type="button" 
                        class="btn btn-outline-primary col-3" 
                        @click="addProduct">Add to Cart
                        </button>
                        <p v-if="isOk" class="text-success fs-7 mt-1">Item is successfully added to your Cart.</p>
                        <p v-if="isError" class="text-danger fs-7 mt-1">Something went wrong, please Singup or try again later.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            productData: {},
            quantity: 1,
            isOk: false,
            isError: false,
            isFatalError: false
        }
    },
    methods: {
        async getProduct() {
            const productId = parseInt(this.$route.params.productId);
            try {
                await axios.get(`http://localhost:5005/api/v1/products/${productId}`).then((responseData) => {
                this.productData = responseData.data.result[0];
            });
            } catch (error) {
                console.log(error);
                this.isFatalError = true;
            }
        },
        async addProduct() {
            const config = {
                headers: {
                    userid: localStorage.getItem('userId'),
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const data ={
                name: "ignore_data",
            }

            const productId = parseInt(this.$route.params.productId);

            try {
                const responseData = await axios.post(`http://localhost:5005/api/v1/cart/${productId}`, data, config);
                console.log(responseData);
                this.isOk = true;
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        }
    },
    created() {
        this.getProduct();
    }
}
</script>

<style scoped>
.mrg {
    margin-bottom: 400px !important;
}
</style>