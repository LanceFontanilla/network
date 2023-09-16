
<template>
    <div class="container">
        <section v-if="activePost" class=" elevation-5 my-4">
                    <div class="col-12 card elevation-4">
                <div class="card-header">
                    <router-link :to="{name: 'Profile Page', params: {profileId: activePost.creator.id}}" @click.stop> 
                        <img class="profile-pic" :src="activePost.creator.picture" alt="">
                        {{ activePost.creator.name }}
                    </router-link>
                </div>
                <div class="card-body">
                        <img class="img-fluid post-pic" :src="activePost.imgUrl" alt="">
                    <p class="bg-shade p-2 rounded">{{ activePost.body }}</p>
                </div>
                <div class="text-end">
                    <button v-if="activePost.creatorId == account.id" @click="deletePost" class="btn btn-danger">Delete Listing <i class="mdi mdi-delete-forever"></i></button>
                </div>
                <div class="card-footer text-end">
                    <h4><span class="mdi mdi-heart-multiple"></span><span class="mdi mdi-heart-multiple-outline"></span></h4>
                </div>
            </div>
        </section>
        <section v-else>
        <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
        </section>
        
        </div>
    
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import { router } from '../router';

export default {
    
    setup(){
        onMounted(() => getPostById())
        const route = useRoute()
        async function getPostById(){
            try {
                await postsService.getPostById(route.params.postId)
                logger.log('getting post by id', route.params.postId)
            } catch (error) {
                Pop.error(error)
            }
        }


    return { 
        activePost: computed(()=> AppState.activePost),
        account: computed(()=> AppState.account),
        async deletePost(){
            try {
                if(await Pop.confirm('Are you sure you want to delete this post?')){
                    const postId = AppState.activePost.id
                    await postsService.deletePost(postId)
                    router.push({name: 'Posts'})
                    Pop.success('You have deleted this post.')
                }
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

.post-pic{
    height: 400px;
    width: 400px; 
    width: 100%;
    object-fit: contain;
    object-position: center;
}
.profile-pic{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}
</style>