<template>
<div class="container">
  <div v-for="post in posts" :key="post.id" >

    <PostCard :post="post"/>
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


export default {
    setup() {
        onMounted(() => {
            getPosts();
        });
        async function getPosts() {
            try {
                await postsService.getPosts();
                logger.log('getting posts');
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
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
    width: 50vw;

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
