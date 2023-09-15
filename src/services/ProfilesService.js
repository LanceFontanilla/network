import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class ProfilesService {
    async getProfileById(profileId) {
        AppState.activeProfile = null
        const res = await api.get(`api/profiles/${profileId}`)
        logger.log('getting Profile', res.data)
        AppState.activeProfile = new Profile(res.data)
    }
}

export const profilesService = new ProfilesService()