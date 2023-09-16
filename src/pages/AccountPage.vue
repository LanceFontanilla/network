<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container">

    <form @submit.prevent="createPost" >
      <div class="form-group">
        <label for="ImgUrl">ImgUrl</label>
        <input v-model="formData.imgUrl" type="url" class="form-control"  placeholder="imgUrl" maxlength="300">
      </div>
      <div class="form-group">
        <label for="Body">Body</label>
        <textarea v-model="formData.body" type="text" class="form-control"  placeholder="Body" maxlength="300"> </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    
  </div>

</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';

export default {
  setup() {
    const formData = ref({})

    return {
      account: computed(() => AppState.account),
      formData,
      async createPost(){
        try {
          await postsService.createPost(formData.value)
          Pop.success('You have created a post')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
