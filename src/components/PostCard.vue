<template>

   
        <div class="col-12 card elevation-4">
        <router-link :to="{name: 'Post Details', params: {postId: post.id}}">     
            <div class="card-header">
                <img class="profile-pic" :src="post.creator.picture" alt="">
                {{ post.creator.name }}
            </div>
            <div class="card-body">
                <img class="img-fluid blog-pic" :src="post.imgUrl" alt="">
                <p class="bg-shade p-2 rounded">{{ post.body }}</p>
                <p>{{ post.createdAt }}</p>
            </div>
        </router-link>        
            <div class="card-footer text-end">

                <!-- <h4>Likes Count:{{ post.likes.length }}</h4> -->
            </div>
        </div>
    
</template>



<script>
import { Post } from '../models/Posts';

export default {
    props: {post: {type: Post, required:true}},
setup() {
  return {


  };
},
};
</script>


<style lang="scss" scoped>


.blog-pic{
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