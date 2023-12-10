import { Category } from "../category"

export interface Post {
    id: string
    title: string
    content: string
    category : Category
    createdAt: Date
    updatedAt: Date
}