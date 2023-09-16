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
        AppState.posts = []
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
    async createPost(post) {
        const res = await api.post('api/posts', post)
        logger.log('creating post', res.data)
        const newPost = new Post(res.data)
        AppState.posts.push(newPost)
        return newPost
    }
    async deletePost(postId) {
        const foundPost = AppState.posts.find(post => postId == post.id)
        const postIndex = AppState.posts.indexOf(foundPost)
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('deleting post', res.data)
        AppState.posts.splice(postIndex, 1)
    }

    // setActivePost(postId) {
    //     const post = AppState.posts.find(post => post.id == postId)
    //     AppState.activePost = post
    // }

}

export const postsService = new PostsService()