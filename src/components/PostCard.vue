<template>
    <div class="col-10">
        <div>
            <img class="profile-pic" :src="post.creator.picture" alt="">
            {{ post.creator.name }}
        </div>
        <div class="">
        <img class="img-fluid blog-pic" :src="post.imgUrl" alt="">
        </div>
        <p class="bg-shade p-2 rounded">{{ post.body }}</p>
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