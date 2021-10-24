import {fetchApi} from "@framework/utils";
import {ApiConfig} from "@common/types/api";

class Config {
    private readonly config: ApiConfig

    constructor(config: ApiConfig) {
        this.config = config
    }

    getConfig(): ApiConfig {
        return this.config
    }
}

const configWrapper = new Config({
    apiUrl: "https://dastanaa.projekt.ir/graphql",
    fetch: fetchApi
})

export function getConfig(): ApiConfig {
    return configWrapper.getConfig()
}