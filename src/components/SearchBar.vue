<template>

    <form @submit.prevent="searchPosts" class="row">
        <div class="col-12 input-group">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="search posts">
            <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
        </div>
    </form>
    <div v-if="activeSearch" class="mt-2">
        <p>Searching for:</p>

        <span class="border border-primary rounded-pill p-2">{{ activeSearch }} <button @click="clearSearch" class="btn"><i
                    class="mdi mdi-close"></i></button></span>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';

export default {

    setup() {
        
        const searchTerm = ref('')

    return {
        searchTerm,
        activeSearch : computed(()=> AppState.searchTerm),
        async searchPosts(){
            try {
                logger.log('searching', searchTerm.value)
                await postsService.searchPosts(searchTerm.value)
            } catch (error) {
                Pop.error(error)
            }
        },
        async clearSearch(){
            try {
                if(await Pop.confirm('Clear search results?')){
                    await postsService.clearSearch()
                    searchTerm.value = ''
                }
            } catch (error) {
                Pop.error(error)
            }
        }
    };

},
};
</script>


<style>
</style>