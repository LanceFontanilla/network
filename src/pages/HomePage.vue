<template>
<div class = "container-fluid ">

  <div class = "card elevation-5 m-5 p-3 welcome-card bg-dark text-light " >
    <h1 class="text-center mb-3">Welcome To The Network!</h1>
    <h3 class="text-center"> The CodeWorks Alumni Network is an online platform used by CodeWorks students to stay connected as they continue their journey as software developers!</h3>
  </div>

</div>

<div class="container my-2">
  <SearchBar/>
</div>

<div class="container">
<div class="col-12">
  <ChangePageButtons/>
</div>

<!-- //SECTION - posts -->
<div class="row">
  <section class="col-12 col-md-8">
    <div v-for="post in posts" :key="post.id" class="my-4" >
      <PostCard :post="post"/>
    </div>
  </section>
<!-- //SECTION - ads -->  
  <section class="col-12 col-md-4">
    <div v-for="flyer in flyers" :key="flyer.id" class="my-4">
      <FlyerCardTall :flyer="flyer"/>
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
import  FlyerCardTall  from '../components/FlyerCardTall.vue'

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
    components: { PostCard, FlyerCardTall }
    
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .welcome-card{
    background-image: url(https://bcw.blob.core.windows.net/public/images/7538647622428924);
    max-height: 50vh;
    background-position: center;
    background-size: cover;
  }


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
