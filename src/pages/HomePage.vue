<template>

<div class="container my-2">
  <SearchBar/>
</div>

<div class="container">

<div>
  <ChangePageButtons/>
</div>

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
          posts: computed(() => AppState.posts),
          flyers: computed(() => AppState.flyers),


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
