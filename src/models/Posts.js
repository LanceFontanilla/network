

export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt).toLocaleDateString() + ' ' + new Date(data.createdAt).toLocaleTimeString()
        this.likes = data.likes
        this.completedClass = data.completed ? 'todo-complete' : ''
        this.checkboxState = data.completed ? 'checked' : ''
    }
}