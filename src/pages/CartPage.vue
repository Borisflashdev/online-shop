<template>
<section class="h-100 h-custom">
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modalDatas.title }}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">{{ modalDatas.text }}</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-if="deleteModal" @click="deleteCart()">{{ modalDatas.btn }}</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else>{{ modalDatas.btn }}</button>
      </div>
    </div>
  </div>
</div>
  <p v-if="isError" class="text-dark fs-5 text text-center my-5 mrg">Something went wrong, please try again later.</p>

  <div v-else class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card bg-light border border-3 rounded-3">
          <div class="card-body p-4">

            <div class="row">

              <div class="col-lg-7">
                <h5 class="mb-3 text-body">{{ userName }}' Cart</h5>
                <hr>
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p class="mb-0">You have {{ cartQuantity }} items in your cart</p>
                  </div>
                  <div>
                    <p 
                      class="mb-0 text-danger dlt" 
                      data-bs-toggle="modal" 
                      data-bs-target="#exampleModal2"
                      @click="modalData('Delete')">Delete Cart</p>
                  </div>
                </div>

                <div class="card mb-3" v-for="product in products" :key="product.product_id">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            :src="product.img"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5>{{ product.name }}</h5>
                          <p class="small mb-0">{{ product.author }}</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 80px;">
                          <h5 class="fw-normal mb-0">{{ product.price }}$</h5>
                        </div>
                        <div style="width: 50px;">
                          <h5 class="mb-0">{{ product.quantity }}</h5>
                        </div>
                        <a @click="deleteItem(product.product_id)" class="me-2 can"><font-awesome-icon icon="fa-solid fa-trash" /></a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-lg-5">

                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0">Shopping Details</h5>
                    </div>
                  <form @click.prevent="addOrder">
                    <p class="small mb-2">Card type</p>
                    <a href="#!" type="submit" class="text-white me-3">
                        <font-awesome-icon icon="fa-brands fa-cc-mastercard" size="2x" />
                    </a>
                    <a href="#!" type="submit" class="text-white me-3">
                        <font-awesome-icon icon="fa-brands fa-cc-visa" size="2x" />
                    </a>
                    <a href="#!" type="submit" class="text-white me-3">
                        <font-awesome-icon icon="fa-brands fa-cc-amex" size="2x" />
                    </a>
                    <a href="#!" type="submit" class="text-white">
                        <font-awesome-icon icon="fa-brands fa-cc-paypal" size="2x" />
                    </a>

                    <form class="mt-4">
                      <div class="form-outline form-white mb-4">
                        <input type="text" id="typeAddress" class="form-control form-control-lg" siez="17"
                          placeholder="Country, City, Street" v-model="adress" />
                        <label class="form-label" for="typeAddress">Address</label>
                      </div>

                      <div class="form-outline form-white mb-4">
                        <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                          placeholder="Peter Peterson" v-model="name" />
                        <label class="form-label" for="typeName">Cardholder's Name</label>
                      </div>

                      <div class="form-outline form-white mb-4">
                        <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                          placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" v-model="cardNumber" />
                        <label class="form-label" for="typeText">Card Number</label>
                      </div>

                      <div class="row mb-4">
                        <div class="col-md-6">
                          <div class="form-outline form-white">
                            <input type="text" id="typeExp" class="form-control form-control-lg"
                              placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" v-model="expiration" />
                            <label class="form-label" for="typeExp">Expiration</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-outline form-white">
                            <input type="text" id="typeText" class="form-control form-control-lg"
                              placeholder="123" size="1" minlength="3" maxlength="3" v-model="cvv" />
                            <label class="form-label" for="typeText">Cvv</label>
                          </div>
                        </div>
                        
                      </div>

                    </form>

                    <hr class="my-4">

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Subtotal</p>
                      <p class="mb-2">{{ cost }}.00$</p>
                    </div>

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Shipping</p>
                      <p class="mb-2">20.00$</p>
                    </div>

                    <div class="d-flex justify-content-between mb-4">
                      <p class="mb-2">Total</p>
                      <p class="mb-2">{{ parseInt(cost) + 20 }}.00$</p>
                    </div>

                    <button 
                      type="button" 
                      class="btn btn-light btn-block btn-lg"
                      data-bs-toggle="modal" 
                      data-bs-target="#exampleModal2">
                      <div class="d-flex justify-content-between">
                        <span>Checkout</span>
                      </div>
                    </button>
                  </form>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userName: localStorage.getItem('userName'),
            cartQuantity: null,
            products: [],
            subtotalCost: null,
            isError: false,
            modalDatas: {},
            deleteModal: false,
            adress: '',
            name: '',
            cardNumber: '',
            expiration: '',
            cvv: ''
        }
    },
    computed: {
      cost() {
        if (this.subtotalCost === null) {
          return '0';
        } else {
          return this.subtotalCost;
        }
      }
    },
    methods: {
        async getCart() {

            const config = {
                headers:{
                    userid: localStorage.getItem('userId'),
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            try {
              const responseData = await axios.get('http://localhost:5005/api/v1/cart', config);
              this.cartQuantity = responseData.data.result.length;
              const data = [];
              for (const id in responseData.data.result) {
                const price = responseData.data.result[id].price * parseInt(responseData.data.result[id].quantity)
                data.push({
                    author: responseData.data.result[id].author, 
                    img: responseData.data.result[id].img,
                    name: responseData.data.result[id].name,
                    price: price,
                    product_id: responseData.data.result[id].product_id,
                    quantity: parseInt(responseData.data.result[id].quantity),
                });
                this.subtotalCost += price;
            }
            this.products = data;
            console.log(this.products);
            } catch (error) {
              console.log(error);
              this.isError = true;
            }
        },
        async deleteItem(id) {
          const config = {
                headers:{
                    userid: localStorage.getItem('userId'),
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          };
          try {
            const responseData = await axios.delete(`http://localhost:5005/api/v1/cart/${id}`, config);
            console.log(responseData);
            location.reload();
          } catch (error) {
            console.log(error);
          }

        },
        async deleteCart() {
          const config = {
            headers:{
                userid: localStorage.getItem('userId'),
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          };
          try {
            const responseData = await axios.delete(`http://localhost:5005/api/v1/cart`, config);
            console.log(responseData);
            location.reload();
          } catch (error) {
            console.log(error);
          }
        },
        modalData(type) {
          if (type === 'Delete') {
            this.modalDatas = {
              title: 'Delete Cart',
              text: 'Are you sure you want to delete cart?',
              btn: 'Delete'
            }
            this.deleteModal = true;
          } else if (type === 'Invalid') {
            this.modalDatas = {
              title: 'Invalid',
              text: 'Please enter valid Shopping Details.',
              btn: 'Ok'
            }
            this.deleteModal = false;
          } else if (type === 'Empty') {
            this.modalDatas = {
              title: 'Empty Cart',
              text: 'Please select some products and try again.',
              btn: 'Ok'
            }
            this.deleteModal = false;
          } else if (type === 'Success') {
            this.modalDatas = {
              title: 'Your Products are on the way!',
              text: 'Thanks you for shopping on Book Store. Your order will arive in 2 business days.',
              btn: 'Ok'
            }
            this.deleteModal = false;
          } else if (type === 'Error') {
            this.modalDatas = {
              title: 'Error',
              text: 'Something went wrong and your order failed, please try again later.',
              btn: 'Ok'
            }
            this.deleteModal = false;
          }
        },
        async addOrder() {
          if (
            this.adress === '' ||
            this.name === '' ||
            this.cardNumber === '' ||
            this.expiration === '' || 
            this.cvv === ''
          ) {
            this.modalData('Invalid');
            return;
          } else if (this.products.length === 0) {
            this.modalData('Empty');
            return;
          } else {
            const config = {
              headers:{
                  userid: localStorage.getItem('userId'),
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  adress: this.adress
              }
            };
            const data = {
              ignore: "ignore_data"
            };
            try {
              const responseData = await axios.post('http://localhost:5005/api/v1/order', data, config);
              console.log(responseData);
              this.modalData('Success');
              this.adress = '';
              this.name = '';
              this.cardNumber = '';
              this.expiration = ''; 
              this.cvv = '';
            } catch (error) {
              this.modalData('Error');
              console.log(error);
            }
          }
        }
    },
    created() {
        this.getCart();
    }
}
</script>

<style scoped>
.can {
  color: #DC4C64;
}
.can:hover {
  cursor: pointer;
}

.dlt:hover {
  text-decoration: underline;
  cursor: pointer;
}
.mrg {
  margin-bottom: 400px !important;
}
</style>