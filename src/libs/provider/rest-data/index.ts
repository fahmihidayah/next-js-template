import { axiosInstance } from "@/libs/rest-data/axios";
import { BaseResponse, PaginateResponse } from "@/types/response";

export interface RequestOption {
    id?: string | null
    params?: any | null
}

export interface DataProviderConf {
    resource: string
}


export interface IDataProvider<T> {

    safeConfiguration(configuration?: DataProviderConf): DataProviderConf
    getMany(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<Array<T>> | undefined>
    getPaginateList(configuration?: DataProviderConf, option?: RequestOption): Promise<PaginateResponse<Array<T>>>
    getOne(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>>
    create(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>>
    update(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>>
    delete(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>>
}

export class RestDataProvider<T> implements IDataProvider<T> {

    constructor(
        public readonly configuration: DataProviderConf
    ) {

    }

    safeConfiguration(configuration?: DataProviderConf): DataProviderConf {
        if (configuration) {
            return configuration
        }
        else {
            return this.configuration
        }
    }


    async getMany(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T[]> | undefined> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(
            safeConf?.resource
        )
        const data = response.data as BaseResponse<T[]>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async getPaginateList(configuration?: DataProviderConf, option?: RequestOption): Promise<PaginateResponse<T[]>> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(safeConf.resource,{params :  option?.params})
        const data = response.data as PaginateResponse<T[]>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async getOne(configuration?: DataProviderConf,option?: RequestOption): Promise<BaseResponse<T>> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(`${safeConf.resource}/${option?.id}`)
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async create(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.post(`${safeConf.resource}`, option?.params)
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async update(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.patch(`${safeConf.resource}/${option?.id}`, option?.params)
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async delete(configuration?: DataProviderConf, option?: RequestOption): Promise<BaseResponse<T>> {
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.delete(`${safeConf.resource}/${option?.id}`)
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }



}