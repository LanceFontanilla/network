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
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    
    </div>
</template>

<script>
export default {
setup() {
  return {};
},
};
</script>


<style lang="scss" scoped>

</style>