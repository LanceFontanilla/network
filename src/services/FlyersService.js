import { AppState } from "../AppState"
import { Flyer } from "../models/Flyers"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class FlyersService {
    async getFlyers() {
        AppState.posts = []
        const res = await api.get('api/ads')
        logger.log('got flyers from service', res.data)
        AppState.flyers = res.data.map(flyer => new Flyer(flyer))
    }

}

export const flyersService = new FlyersService()