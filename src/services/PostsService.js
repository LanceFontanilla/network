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
}

export const postsService = new PostsService()