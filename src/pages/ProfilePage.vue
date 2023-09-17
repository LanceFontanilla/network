<template>

<div v-if="profile" class="container">
<section class="mt-4">
    <div class="row d-flex justify-content-between text-center align-items-center cover-img">

        <div class="col-3 my-4">
            <img class="profile-pic img-fluid" :src="profile.picture" alt=""> 
        </div>
            
        </div>
        <div class="row d-flex justify-content-between text-center alight-items-center">
            <div class="col-3 text-center">
                <h3 class="my-2">{{ profile.name }}</h3>
            </div> 
            
            <div class="col-3 my-3">
                links
            </div>
        </div>
            
    <div class="col-12 p-3 mb-3">
        <p>{{ profile.bio }}</p>
    </div>

</section>


    <section v-if="!searchTerm" class="row justify-content-between mb-2 fw-bold align-items-center">
        <button @click="changePageByProfileId(pageNumberById - 1)" :disabled="pageNumberById <= 1" class="col-6 col-md-3 btn btn-warning">Newer <i class="mdi mdi-arrow-left"></i></button>
        {{ pageNumberById }}
        <button @click="changePageByProfileId(pageNumberByIdById + 1)" :disabled="pageNumberById >= totalPagesById" class="col-6 col-md-3 btn btn-warning">Older <i class="mdi mdi-arrow-right"></i></button>

    </section>
        <section v-else class="row justify-content-between mb-2">
        <button @click="changePageWithSearch(pageNumberById - 1)" :disabled="pageNumberById <= 1" class="col-6 col-md-3 btn btn-success">Newer <i class="mdi mdi-arrow-left"></i></button>
        {{ pageNumberById }}
        <button @click="changePageWithSearch(pageNumberById + 1)" :disabled="pageNumberById >= totalPagesById" class="col-6 col-md-3 btn btn-success">Older <i class="mdi mdi-arrow-right"></i></button>
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
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService';
import { AppState } from '../AppState';
import { profilesService } from '../services/ProfilesService';
import { flyersService } from '../services/FlyersService';
import { logger } from '../utils/Logger';


export default {
setup() {
    onMounted(()=>{
        getProfileById();
        getPostsByProfileId()   
        getFlyers()     
        
    });
    const route = useRoute();
    async function getPostsByProfileId(){
        try {
            await postsService.getPostsByProfileId(route.params.profileId);
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
    async function getProfileById(){
        try {
            await profilesService.getProfileById(route.params.profileId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
        getPostsByProfileId,

    async changePageByProfileId(number) {
        try {
            await postsService.changePageByProfileId(route.params.profileId&`api/posts?page=${number}`)
        } catch (error) {
            Pop.error(error)
        }
            },
        profile: computed(()=> AppState.activeProfile),
        account: computed(()=> AppState.account),
        posts: computed(()=> AppState.posts),
        pageNumberById: computed(() => AppState.pageNumberById),
        totalPagesById: computed(() => AppState.totalPagesById),
        searchTermById: computed(() => AppState.searchTermById),
        flyers: computed(() => AppState.flyers),
        coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
  };
},
};
</script>


<style lang="scss" scoped>
.cover-img{
  background-image: v-bind(coverImg);
  max-height: 30vh;
  background-position: center;
  background-size: cover;
}

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

.profile-card-header{
   
    min-height: 30vh;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.profile-card-body{
    min-height: 40vh;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 20px;
    

}
</style>

