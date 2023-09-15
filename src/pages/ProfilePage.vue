<template>
    <div v-if="profile" class="container">
        <div>
            <h2>
                {{ profile.name }}
            </h2>
            <img :src="profile.picture" :alt="profile.name" class="profile-pic">
            <img :src="profile.coverImg" :alt="profile.name">
            <p>{{ profile.bio }}</p>
            <a :href="profile.github"></a>
        </div>
        
        <div v-for="post in posts" :key="post.id" class="post-pic">
           
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


  };
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

