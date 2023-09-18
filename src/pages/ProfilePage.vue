<template>

<div v-if="profile" class="container">
<section class="mt-4">
    <div class="row d-flex justify-content-between text-center align-items-center cover-img">

        <div class="col-3 my-4">
            <img class="profile-pic img-fluid" :src="profile.picture" alt=""> 
        </div>
            
        </div>
        <div class="card bg-dark text-light mt-5">
        <div class="row d-flex justify-content-evenly text-center">
            <div class="col-3 d-flex align-items-center justify-content-center">
                <h3 class="">{{ profile.name }}</h3>
            </div> 
            <div class="col-3 d-flex align-items-center justify-content-center">
            <h4>
            {{ profile.class }}
            </h4>
            </div>
            <div v-if="profile.graduated == true" class="col-3 mt-3">
                <img class="img-fluid cap-card" src="https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-graduation-icon-graduation-cap-icon-png-image_2047588.jpg" alt="graduation cap">
            </div>
            <div class="col-3 my-3 fs-1 links d-flex">
            <div class="col-6">
                <a v-if="profile.github" target="_blank" :href="profile.github"> <span class="mdi mdi-github"></span></a>
            </div>
            <div class="col-6">
                <a v-if="profile.linkedin" target="_blank" :href="profile.linkedin"><span class="mdi mdi-linkedin"></span></a>
            </div>
            </div>
        </div>
            
    <div class="col-12 p-5 py-0 mb-3">
        <p>{{ profile.bio }}</p>
    </div>
</div>
</section>


    <div v-if="user.isAuthenticated" class="container-fluid text-dark mb-5">
        <div class="card mt-5">
            <h1 class="ms-4 mt-2">Create New Post</h1>
            <FormCard/>
        </div>
    </div>
    <div v-else class="text-center mb-4">
        <h1>Login To Create New Post</h1>
          <Login />
    </div>


    <section v-if="!searchTerm" class="row justify-content-between mb-2 fw-bold align-items-center mx-0">
        <button @click="changePageByProfileId(profileId, pageNumberById - 1)" :disabled="pageNumberById <= 1" class="col-12 col-md-3 btn btn-dark"> <i class="mdi mdi-arrow-left">Newer</i></button>
        <div class="col-12 col-md-3 text-center">
        {{ pageNumberById }}
        </div>
        <button @click="changePageByProfileId(profileId, pageNumberById + 1)" :disabled="pageNumberById >= totalPagesById" class="col-12 col-md-3 btn btn-dark">Older <i class="mdi mdi-arrow-right"></i></button>

    </section>
        <section v-else class="row justify-content-between mb-2 fw-bold align-items-center mx-0">
        <button @click="changePageWithSearch(pageNumberById - 1)" :disabled="pageNumberById <= 1" class="col-12 col-md-3 btn btn-secondary"><i class="mdi mdi-arrow-left">Newer </i></button>
        <div class="col-12 col-md-3 text-center">
        {{ pageNumberById }}2
        </div>
        <button @click="changePageWithSearch(pageNumberById + 1)" :disabled="pageNumberById >= totalPagesById" class="col-12 col-md-3 btn btn-secondary">Older <i class="mdi mdi-arrow-right"></i></button>
    </section>



    <div class="row">
    <section class="col-12 col-md-8">
        <div v-for="post in posts" :key="post.id" class="my-4" >
        <PostCard :post="post"/>
        </div>
    </section>

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
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService';
import { AppState } from '../AppState';
import { profilesService } from '../services/ProfilesService';
import { flyersService } from '../services/FlyersService';
import { logger } from '../utils/Logger';
import Login from '../components/Login.vue'

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
        async changePageByProfileId(profileId, number) {
            try {
            await postsService.changePageByProfileId(profileId, number)
        } catch (error) {
            Pop.error(error)
        }
            },
        profile: computed(()=> AppState.activeProfile),
        profileId: computed(()=> route.params.profileId),
        account: computed(()=> AppState.account),
        user: computed(() => AppState.user),
        posts: computed(()=> AppState.posts),
        pageNumberById: computed(() => AppState.pageNumberById),
        totalPagesById: computed(() => AppState.totalPagesById),
        searchTermById: computed(() => AppState.searchTermById),
        flyers: computed(() => AppState.flyers),
        coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
  };
},
    components: { Login }
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

.cap-card{
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 30em;
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

.links{
    text-decoration: none;
    color: black
}
</style>

