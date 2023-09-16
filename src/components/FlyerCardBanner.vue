<template>
    <div>
        <img class="img-fluid" :src="flyer.banner" alt="">
    </div>
</template>

<script>
import { Flyer } from '../models/Flyers';

export default {
    props: { flyer: { type: Flyer, required: true } },
    setup() {
        return {

        };
    },
};
</script>


<style lang="scss" scoped></style>