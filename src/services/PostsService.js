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
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
    }
    async getPostById(postId) {
        AppState.activePost = null
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
        AppState.pageNumberById = res.data.page
        AppState.totalPagesById = res.data.totalPages
        logger.log(res.data.totalPages)

    }
    async createPost(post) {
        const res = await api.post('api/posts', post)
        logger.log('creating post', res.data)
        const newPost = new Post(res.data)
        AppState.posts.push(newPost)
        return newPost
    }
    async deletePost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('deleting post', res.data)
        AppState.activePost = null

        let indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1)
        }
    }
    async changePage(url) {
        logger.log('page', url)
        const res = await api.get(url)
        logger.log('change page posts', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
    }
    async changePageByProfileId(profileId, url) {
        logger.log('profileId', profileId, url)
        const res = await api.get(`api/posts?creatorId=${profileId}`, url)
        logger.log('change profile page posts', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumberById = res.data.page
        AppState.totalPagesById = res.data.totalPages
    }
    async searchPosts(searchTerm) {
        const res = await api.get(`api/posts?query=${searchTerm}`)
        logger.log('posts query', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
        AppState.searchTerm = searchTerm
    }
    async clearSearch() {
        AppState.searchTerm = ''
        await postsService.getPosts()
    }
}

export const postsService = new PostsService()