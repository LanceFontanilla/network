<template>

    <div class="cover-img card elevation-5 my-5">
            <div>
                <img :src="profile.picture" :alt="profile.name" class="profile-pic">
            </div>
<h2>
                {{ profile.name }}
            </h2>         
<p>{{ profile.bio }}</p>
<a :href="profile.github"></a>
        </div>


    <div class="container">
        <div v-for="post in posts" :key="post.id" class="my-4">

            <PostCard :post="post" />
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


export default {
setup() {
    onMounted(()=>{
        getProfileById();
        getPostsByProfileId()        
        
    });
    const route = useRoute();
    async function getPostsByProfileId(){
        try {
            await postsService.getPostsByProfileId(route.params.profileId);
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
        profile: computed(()=> AppState.activeProfile),
        account: computed(()=> AppState.account),
        posts: computed(()=> AppState.posts),
        coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)

  };
},
};
</script>


<style lang="scss" scoped>
.cover-img{
  background-image: v-bind(coverImg);
  min-height: 30vh;
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
</style>

