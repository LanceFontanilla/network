<template>

     <div class="container-fluid text-light">
      <section class="row mt-2">
        <div class="col-4 bg-dark elevation-2 p-2">
          <h3>Welcome {{ account.name }}</h3>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
        <div class="col-8 bg-dark">
          <h3>Edit Profile</h3>
      
          <form @submit.prevent="editProfile" class="row">
          <div class="mb-2 col-6">
              <label for="">
              name
              </label>
              <input v-model="editable.name" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
              <label for="">
              email
              </label>
              <input v-model="editable.email" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
              <label for="">
              picture
              </label>
              <input v-model="editable.picture" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
              <label for="">
              coverImg
              </label>
              <input v-model="editable.coverImg" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
              <label for="">
              github
              </label>
              <input v-model="editable.github" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
              <label for="">
              linkedin
              </label>
              <input v-model="editable.linkdin" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
              <label for="">
              bio
              </label>
              <textarea v-model="editable.bio" rows="10" class="form-control h-90"></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-success">Save Changes</button>
          </div>

          </form>
        </div>
      </section>
     


    <div class="text-dark">
      <h1 class="ms-4 mt-5">Create New Post</h1>
      <FormCard/>
    </div>
  </div>

</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import FormCard from '../components/FormCard.vue'
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger';
import { accountService } from '../services/AccountService';


export default {
  setup() {
    const formData = ref({})
    const editable = ref({})
    const router = useRouter()

    watchEffect(() => {
      logger.log('watch ran', editable.value)
      AppState.account
      editable.value = AppState.account
    })

    return {
      editable,
      account: computed(() => AppState.account),
      formData,
      async createPost(){
        try {
          await postsService.createPost(formData.value)
          Pop.success('You have created a post')
        } catch (error) {
          Pop.error(error)
        }
      },
      async editProfile(){
        try {
          logger.log('edited info', editable.value)
          await accountService.editProfile(editable.value)
          Pop.success('Profile Updated')
          router.push({name:'Account', params: {profileId: AppState.account.id}})
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
