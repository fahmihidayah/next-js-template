import { axiosInstance } from "@/libs/rest-data/axios";
import { BaseResponse, PaginateResponse } from "@/types/response";

export interface RequestOption {
    id?: string | null
    params?: any | null
}

export interface DataProviderConf {
    resource: string
}

export interface ProviderParams { 
    configuration?: DataProviderConf;
    option? : RequestOption;
}

export interface IDataProvider<T> {

    safeConfiguration(configuration?: DataProviderConf): DataProviderConf
    getMany(providerParams? : ProviderParams): Promise<BaseResponse<Array<T>> | undefined>
    getPaginateList(providerParams? : ProviderParams): Promise<PaginateResponse<Array<T>>>
    getOne(providerParams? : ProviderParams): Promise<BaseResponse<T>>
    create(providerParams? : ProviderParams): Promise<BaseResponse<T>>
    update(providerParams? : ProviderParams): Promise<BaseResponse<T>>
    delete(providerParams? : ProviderParams): Promise<BaseResponse<T>>
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


    async getMany(providerParams? : ProviderParams): Promise<BaseResponse<T[]> | undefined> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(
            safeConf?.resource, {
                params : option?.params
            }
        )
        const data = response.data as BaseResponse<T[]>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async getPaginateList(providerParams? : ProviderParams): Promise<PaginateResponse<T[]>> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
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

    async getOne(providerParams? : ProviderParams): Promise<BaseResponse<T>> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
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

    async create(providerParams? : ProviderParams): Promise<BaseResponse<T>> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.post(`${safeConf.resource}`, option?.params)
        const data = response.data as BaseResponse<T>
        console.log(data)
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async update(providerParams? : ProviderParams): Promise<BaseResponse<T>> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
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

    async delete(providerParams? : ProviderParams): Promise<BaseResponse<T>> {
        const {configuration, option} = providerParams ? providerParams : {configuration : undefined, option: undefined}
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