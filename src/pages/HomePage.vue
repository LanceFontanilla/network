<template>
<div class="container">
  <section v-if="!searchTerm" class="row justify-content-between mb-2 fw-bold align-items-center">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-6 col-md-3 btn btn-warning">Newer <i class="mdi mdi-arrow-left"></i></button>
      {{ pageNumber }}
      <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-6 col-md-3 btn btn-warning">Older <i class="mdi mdi-arrow-right"></i></button>
  
    </section>
    <section v-else class="row justify-content-between mb-2">
      <button @click="changePageWithSearch(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-6 col-md-3 btn btn-success">Newer <i class="mdi mdi-arrow-left"></i></button>
      {{ pageNumber }}
      <button @click="changePageWithSearch(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-6 col-md-3 btn btn-success">Older <i class="mdi mdi-arrow-right"></i></button>
    </section>

<div class="row">

  <section class="col-8">
    <div v-for="post in posts" :key="post.id" class="my-4" >
      <PostCard :post="post"/>
    </div>
  </section>
  
  <section class="col-4">
    <div v-for="flyer in flyers" :key="flyer.id" class="my-4">
      <FlyerCard :flyer="flyer"/>
    </div>
  </section>
  
</div>


</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import { flyersService } from '../services/FlyersService'
import  FlyerCard  from '../components/FlyerCard.vue'

export default {
    setup() {
        onMounted(() => {
            getPosts();
            getFlyers();
        });
        async function getPosts() {
            try {
                await postsService.getPosts();
                logger.log('plain get posts');
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getFlyers(){
            try {
              await flyersService.getFlyers(); 
              logger.log('got flyers')
            } catch (error) {
            Pop.error(error)
            }
        }
        return {
          getPosts,
          
          async changePage(number){
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
            posts: computed(() => AppState.posts),
            flyers: computed(() => AppState.flyers),
            pageNumber: computed(() => AppState.pageNumber),
            totalPages: computed(() => AppState.totalPages),
            searchTerm: computed(() => AppState.searchTerm),
        };
    },
    components: { PostCard, FlyerCard }
    
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 100px;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
