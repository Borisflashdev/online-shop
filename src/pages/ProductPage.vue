<template>
    <div>
        <div class="product-details row mt-4 mb-4 justify-content-center">
            <div class="col-3">
                <img :src="productData.img" class="img-fluid border border-dark rounded-3" alt="product_img">
            </div>
            <div class="col-5">
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
                    <button type="button" class="btn btn-outline-primary">Add to Cart</button>
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
            productData: {}
        }
    },
    methods: {
        async getProduct() {
            const productId = parseInt(this.$route.params.productId);
            await axios.get(`http://localhost:5005/api/v1/products/${productId}`).then((responseData) => {
                this.productData = responseData.data.result[0];
            });
        }
    },
    created() {
        this.getProduct();
    }
}
</script>