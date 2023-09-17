<template>
    
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container">

    <div>
      <FormCard/>
    </div>
  </div>

</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import FormCard from '../components/FormCard.vue'

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
  },
  components: { FormCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
