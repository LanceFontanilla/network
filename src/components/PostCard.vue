<template>
    <div class="col-10 card elevation-4">
        <div class="card-header">
            <img class="profile-pic" :src="post.creator.picture" alt="">
            {{ post.creator.name }}
        </div>
        <div class="card-body">
        <img class="img-fluid blog-pic" :src="post.imgUrl" alt="">
        <p class="bg-shade p-2 rounded">{{ post.body }}</p>
        </div>
        <div class="card-footer text-end">
            <h4><span class="mdi mdi-heart-multiple"></span><span class="mdi mdi-heart-multiple-outline"></span></h4>
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

.blog-card{
    color: black
}

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