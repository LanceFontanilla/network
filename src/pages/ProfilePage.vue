<template>
    <div v-if="profile" class="">
        <div>
            <h2>
                {{ profile.name }}
            </h2>
            <img :src="profile.picture" :alt="profile.name">
            <img :src="profile.coverImg" :alt="profile.name">
            <p>{{ profile.bio }}</p>
            <a :href="profile.github"></a>
        </div>

        <div v-for="blog in blogs" :key="blog.id">
            <Blog :blog="blog" />
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';

export default {
setup() {
    const route = useRoute()
    onMounted(()=>{
        
    })
    // async function (){
    //     try {
            
    //     } catch (error) {
    //         Pop.error(error)
    //     }
    // }
  return {

  };
},
};
</script>


<style lang="scss" scoped>
</style>

