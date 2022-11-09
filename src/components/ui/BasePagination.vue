<template>
    <div class="d-flex justify-content-center mt-3"> 
        <nav aria-label="..." v-if="isMorePages">
            <ul class="pagination">
                <li class="page-item">
                    <span 
                        :class="{'page-link': true, 'disabled': isPage(1) }" 
                        tabindex="-1" 
                        @click="previousPage()">Previous
                    </span>
                </li>
                <li class="page-item" v-for="index in pagesNum" :key="index">
                    <span 
                        :class="{'page-link': true, 'active': isActive(index) }" 
                        @click="sendPage(index)">{{ index }}
                    </span>
                </li>
                <li class="page-item">
                    <span 
                        :class="{'page-link': true, 'disabled': isPage(pagesNum) }"
                        @click="nextPage()">Next
                    </span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    emits: ['sendPage'],
    data() {
        return {
            pagesNum: null,
            previousDisabled: false
        }
    },
    computed: {
        isMorePages() {
            if (parseInt(localStorage.getItem('pagesNum')) !== 1) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        async sendPage(pageNum) {
            await this.$router.push(`/home/${pageNum}`);
            this.$emit('sendPage');
        },
        async previousPage() {
            const page = parseInt(this.$route.params.page) - 1;
            await this.$router.push(`/home/${page}`);
            this.$emit('sendPage');
        },
        async nextPage() {
            const page = parseInt(this.$route.params.page) + 1;
            await this.$router.push(`/home/${page}`);
            this.$emit('sendPage');
        },
        isActive(num) {
            if (parseInt(this.$route.params.page) === num) {
                return true;
            } else {
                return false;
            }
        },
        isPage(num) {
            if (parseInt(this.$route.params.page) === num) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {
        this.pagesNum = parseInt(localStorage.getItem('pagesNum'));
    },
}
</script>

<style scoped>
.active {
    color: white;
    background-color: #0d6efd;
}
</style>