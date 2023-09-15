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

}

export const postsService = new PostsService()