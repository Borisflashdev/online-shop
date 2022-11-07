<template>
    <div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Filters
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <form>
                        <div class="accordion-body row">
                            <div class="col-12 col-sm-2">
                                <label for="customRange1" class="form-label">Price: {{ priceComment }}$</label>
                                <input type="range" class="form-range" max="100" id="customRange1" v-model="priceFilter">
                            </div>
                            <div class="col-12 col-sm-3">
                                <label for="category-input" class="form-label">Category:</label>
                                <select class="form-select" id="category-input" aria-label="Default select example" v-model="categoryFilter">
                                    <option value="category">All</option>
                                    <option value="'Philosophy'">Philosophy</option>
                                    <option value="'Self Improvment'">Self Improvment</option>
                                    <option value="'Manga'">Manga</option>
                                    <option value="'Biography'">Biography</option>
                                    <option value="'Scifi'">Scifi</option>
                                    <option value="'Novel'">Novel</option>
                                    <option value="'Horror'">Horror</option>
                                    <option value="'Comics'">Comics</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-3">
                                <label for="author-input" class="form-label">Author:</label>
                                <select class="form-select" id="author-input" aria-label="Default select example" v-model="authorFilter">
                                    <option value="author">All</option>
                                    <option value="'Marcus Aurelius'">Marcus Aurelius</option>
                                    <option value="'James Clear'">James Clear</option>
                                    <option value="'Epictetus'">Epictetus</option>
                                    <option value="'Eiichiro Oda'">Eiichiro Oda</option>
                                    <option value="'Kohata Hirano'">Kohata Hirano</option>
                                    <option value="'Prince Harry The Duke of Sussex'">Prince Harry The Duke of Sussex</option>
                                    <option value="'Robert Greene'">Robert Greene</option>
                                    <option value="'James Dashner'">James Dashner</option>
                                    <option value="'Rowling J. K.'">Rowling J. K.</option>
                                    <option value="'Dmitry Glukhovsky'">Dmitry Glukhovsky</option>
                                    <option value="'Leo Tolstoy'">Leo Tolstoy</option>
                                    <option value="'Stephen King'">Stephen King</option>
                                    <option value="'Colleen Hoover'">Colleen Hoover</option>
                                    <option value="'Katy Hays'">Katy Hays</option>
                                    <option value="'Sarah Penner'">Sarah Penner</option>
                                    <option value="'J. R. R. Tolkien'">J. R. R. Tolkien</option>
                                    <option value="'Garth Ennis'">Garth Ennis</option>
                                    <option value="'Robert Kirkman'">Robert Kirkman</option>
                                    <option value="'Joseph Murphy'">Joseph Murphy</option>
                                    <option value="'Ryan Holiday'">Ryan Holiday</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-3">
                                <label for="language-input" class="form-label">Language:</label>
                                <select class="form-select" id="language-input" aria-label="Default select example" v-model="languageFilter">
                                    <option value="language">All</option>
                                    <option value="'English'">English</option>
                                    <option value="'Russian'">Russian</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-1">
                                <label style="color: white">ignore</label><br>
                                <button type="button" class="btn btn-primary btn-sm mt-2 mr-5" @click="filteredProductrs()">Set Filters</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Sort By
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <select class="form-select col" aria-label="Default select example" v-model="sortByFilter">
                                <option value="product_id">Popularity</option>
                                <option value="price DESC">Highest to Lowest</option>
                                <option value="price">Lowest to Highest</option>
                                <option value="name">Name</option>
                            </select>
                            <div class="col">
                                <button type="button" class="btn btn-primary" @click="filteredProductrs()">Sort</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export default {
    emits: ['productsData'],
    props: ['page'],
    data() {
        return {
            priceFilter: localStorage.getItem('price'),
            categoryFilter: localStorage.getItem('category'),
            authorFilter: localStorage.getItem('author'),
            languageFilter: localStorage.getItem('language'),
            sortByFilter: localStorage.getItem('sortBy'),
        }
    },
    computed: {
        priceFiltered() {
            if (parseInt(this.priceFilter) === 50) {
                return 'price'
            } else {
                return this.priceFilter
            }
        },
        priceComment() {
            if (this.priceFilter === 'price') {
                return 50;
            } else {
                return this.priceFilter;
            }
        }
    },
    methods: {
        async filteredProductrs() {

            const price = this.priceFiltered;
            const category = this.categoryFilter;
            const author = this.authorFilter;
            const language = this.languageFilter;
            const sort = this.sortByFilter;

            localStorage.setItem('price', price);
            localStorage.setItem('category', category);
            localStorage.setItem('author', author);
            localStorage.setItem('language', language);
            localStorage.setItem('sortBy', sort);

            this.$router.push('/home/1');
            this.$emit('productsData');
        }
    }
}
</script>