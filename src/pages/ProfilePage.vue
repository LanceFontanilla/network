<template>

   <div class="container">
   
  
<!--<section class="row"> 

     <div class="col-12 profile-card-header elevation-5 mt-3">
        <img :src="profile.picture" alt="" class="profile-pic"> 
        
    </div> 
  <div class="profile-card-body elevation-5 mb-5">
        
        <section class="row">
         <div class="col-6">
            <h4>Summer 2018</h4>
        </div>
        <div class="col-6 text-end">
            Links
        </div>   
        </section>
        
        <h1>{{ profile.name }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sequi laborum quo quaerat voluptatibus dolorem magni quae eligendi culpa harum cupiditate, modi aut esse tempore impedit quas velit? Commodi, nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolores vero cum culpa quos veniam quibusdam, iusto nulla deserunt alias voluptate impedit commodi voluptatibus quasi. Aut, amet. Dicta, laborum delectus!</p>
        
    </div>
    </section> -->






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
        

  };
},
};
</script>


<style lang="scss" scoped>
.cover-img{
  //background-image: v-bind(coverImg);
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

