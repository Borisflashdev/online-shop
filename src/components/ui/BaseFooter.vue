<template>
    <div>
        <footer class="text-center text-lg-start bg-light text-muted">
            <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div class="me-5 d-none d-lg-block">
                    <span class="text">Get connected with us on social networks:</span>
                </div>
                <div>
                <a href="" class="me-4 text-reset">
                    <font-awesome-icon class="text" icon="fa-brands fa-facebook" />
                </a>
                <a href="" class="me-4 text-reset text">
                    <font-awesome-icon class="text" icon="fa-brands fa-twitter" />
                </a>
                <a href="" class="me-4 text-reset text">
                    <font-awesome-icon class="text" icon="fa-brands fa-google" />
                </a>
                <a href="" class="me-4 text-reset text">
                    <font-awesome-icon class="text" icon="fa-brands fa-instagram" />
                </a>
                <a href="" class="me-4 text-reset text">
                    <font-awesome-icon class="text" icon="fa-brands fa-linkedin" />
                </a>
                <a href="" class="me-4 text-reset text">
                    <font-awesome-icon class="text" icon="fa-brands fa-github" />
                </a>
                </div>
            </section>
            <section class="">
                <div class="container text-center text-md-start mt-5">
                    <div class="row mt-3">
                        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 class="text-uppercase fw-bold mb-4 text">
                                <i class="fas fa-gem me-3"></i>Book Store
                            </h6>
                            <p class="text">
                                Book Store is a registered charitable organization under the legal 
                                name Book Store Council.
                            </p>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 class="text-uppercase fw-bold mb-4 text">Best Selling Books</h6>
                            <p class="text">
                                <router-link to="/product/1" class="text-reset">Meditations</router-link>
                            </p>
                            <p class="text">
                                <router-link to="/product/11" class="text-reset">The Maze Runner</router-link>
                            </p>
                            <p class="text" >
                                <router-link to="/product/25" class="text-reset">The Hobbit</router-link>
                            </p>
                            <p class="text">
                                <router-link to="/product/1" class="text-reset">The Daily Stoic</router-link>
                            </p>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 class="text-uppercase fw-bold mb-4 text">Useful links</h6>
                            <p class="text">
                                <router-link to="/home/1" class="text-reset">Home</router-link>
                            </p>
                            <p class="text">
                                <router-link to="/aboutus" class="text-reset">About Us</router-link>
                            </p>
                            <p class="text">
                                <router-link to="/settings" class="text-reset">Settings</router-link>
                            </p>
                            <p class="text">
                                <router-link to="/cart" class="text-reset">Cart</router-link>
                            </p>
                        </div>
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 class="text-uppercase fw-bold mb-4 text">Contact</h6>
                            <p class="text">
                                <i class="fas fa-home me-3"></i> Serbia, Belgrade, Vojvode Milenka 12/3
                            </p>
                            <p class="text">
                                <i class="fas fa-envelope me-3"></i>bookstore@info.com
                            </p>
                            <p class="text"><i class="fas fa-phone me-3"></i>+ 381 43 986</p>
                            <p class="text"><i class="fas fa-print me-3"></i>+ 381 01 234</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="text-center p-4 lower-footer">
                © 2022 Copyright: <a class="text-reset fw-bold" href="#">BookStoore.com</a>
            </div>
        </footer>
    </div>
</template>

<script>
</script>

<style scoped>
.lower-footer {
    background-color: #0d6efd; 
    color: white
}
.text {
    color: #343a40;
}
</style>