<template>

   
        <div class="col-12 card elevation-4">
            <div class="card-header">
                <img class="profile-pic" :src="post.creator.picture" alt="">
                {{ post.creator.name }}
            </div>
        <router-link style="text-decoration: none; color:black" :to="{name: 'Post Details', params: {postId: post.id}}">     
            <div class="card-body text-center">
                    <img class="img-fluid blog-pic" :src="post.imgUrl" alt="">
                <div class="mt-3">
                    <p>{{ post.body }}</p>
                    <p>{{ post.createdAt }}</p>
                </div>
            </div>
        </router-link>        
            <div class="card-footer text-end">
                <h4><span class="mdi mdi-heart-multiple"></span> {{ post.likes.length }}</h4>
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