<template>
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
        <button type="submit" class="btn btn-dark my-3">Create Post</button>
        </form>
    
    </div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';

export default {
    setup() {
    const formData = ref({})
    return {
    formData,
    async createPost() {
        try {
            await postsService.createPost(formData.value)
            formData.value = {}
            Pop.success('You have created a post')
        } catch (error) {
        Pop.error(error)
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>

</style>