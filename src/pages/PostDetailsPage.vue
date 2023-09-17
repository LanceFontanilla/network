
<template>
    <div class="container">
        <section class="col-12 d-flex">
            <div v-for="flyer in flyers" :key="flyer.id"    class="mx-1 my-4">
                <FlyerCardBanner :flyer="flyer"/>
            </div>
        </section>

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
                    <button @click="likePost" class="btn btn-dark">Like Post</button>
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
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import { flyersService } from '../services/FlyersService';



export default {
    
    setup(){
        const route = useRoute()
        const router = useRouter()
        onMounted(() => {
            getPostById()
            getFlyers()
        })
        async function getPostById(){
            try {
                const postId = route.params.postId
                await postsService.getPostById(postId)
                logger.log('getting post by id', postId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getFlyers() {
            try {
                await flyersService.getFlyers();
                logger.log('got flyers')
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
                    router.push({name: 'Home'})
                    Pop.success('You have deleted this post.')
                }
            } catch (error) {
                Pop.error(error)
            }
        },
        async likePost() {
            try {
                const postId = AppState.activePost.id
                await postsService.likePost(postId)
                Pop.success('You liked this post!')
            } catch (error) {
                Pop.error(error)
            }
        },

        flyers: computed(() => AppState.flyers),
     }
    },
    
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