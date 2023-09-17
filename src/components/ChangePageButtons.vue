<template>

    <section v-if="!searchTerm" class="row justify-content-between mb-2 fw-bold align-items-center mx-0">
    <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-12 col-md-3 btn btn-warning"> <i class="mdi mdi-arrow-left">Newer</i></button>
    <div class="col-12 col-md-3 text-center">
        Page: {{ pageNumber }}
    </div>
    <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-12 col-md-3 btn btn-warning">Older <i class="mdi mdi-arrow-right"></i></button>
    </section>
    
    <section v-else class="row justify-content-between fw-bold align-items-center mb-2 mx-0">
    <button @click="changePageWithSearch(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-12 col-md-3 btn btn-success"> <i class="mdi mdi-arrow-left">Newer</i></button>
    <div class="col-12 col-md-3 text-center">
        Page: {{ pageNumber }}
    </div>
    <button @click="changePageWithSearch(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-12 col-md-3 btn btn-success">Older <i class="mdi mdi-arrow-right"></i></button>
    </section>

</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
setup() {
    return {
    pageNumber: computed(() => AppState.pageNumber),totalPages: computed(() => AppState.totalPages),searchTerm: computed(() => AppState.searchTerm),
    async changePage(number) {
        try {
            await postsService.changePage(`api/posts?page=${number}`)
            logger.log('change page posts')
        } catch (error) {
            Pop.error(error)
        }
    },
    async changePageWithSearch(number) {
        try {
            const searchTerm = AppState.searchTerm
            await postsService.changePage(`api/posts?query=${searchTerm}&page=${number}`)
        } catch (error) {
            Pop.error(error)
        }
    },

    };
},
};
</script>


<style>
</style>