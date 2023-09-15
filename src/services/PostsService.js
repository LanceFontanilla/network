import { AppState } from "../AppState"
import { Post } from "../models/Posts"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class PostsService {
    async getPosts() {
        AppState.posts = []
        const res = await api.get('api/posts')
        logger.log('got posts', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }
    async getPostById(postId) {
        const res = await api.get(`api/posts/${postId}`)
        logger.log(res.data, 'getting post by id')
        AppState.activePost = new Post(res.data)
    }
    async getPostsByProfileId(profileId) {
        AppState.posts = []
        logger.log(profileId, 'this is the profile id')
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('getting posts by profile id', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    // setActivePost(postId) {
    //     const post = AppState.posts.find(post => post.id == postId)
    //     AppState.activePost = post
    // }

}

export const postsService = new PostsService()