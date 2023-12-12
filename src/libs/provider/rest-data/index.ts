import { AuthProvider, authProvider } from "@/libs/provider/auth";
import { axiosInstance } from "@/libs/rest-data/axios";
import { BaseResponse, PaginateResponse } from "@/types/response";
import axios, { AxiosError } from "axios";

export interface RequestOption {
    id?: string | null
    params?: any | null
}

export interface DataProviderConf {
    resource: string
}

export interface ProviderParams {
    configuration?: DataProviderConf;
    option?: RequestOption;
}

export interface IDataProvider<T> {

    safeConfiguration(configuration?: DataProviderConf): DataProviderConf
    getMany(providerParams?: ProviderParams): Promise<BaseResponse<Array<T>> | undefined>
    getPaginateList(providerParams?: ProviderParams): Promise<PaginateResponse<Array<T>>>
    getOne(providerParams?: ProviderParams): Promise<BaseResponse<T>>
    create(providerParams?: ProviderParams): Promise<BaseResponse<T>>
    update(providerParams?: ProviderParams): Promise<BaseResponse<T>>
    delete(providerParams?: ProviderParams): Promise<BaseResponse<T>>
    getHeaders(): any
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

    getHeaders(): any {
        const token = authProvider.getToken();

        return {
            "Content-Type": "application/json",
            "Authorization" : (token ? `Bearer ${token}` : "")
        }
    }


    async getMany(providerParams?: ProviderParams): Promise<BaseResponse<T[]> | undefined> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(
            safeConf?.resource,
            {
                params: option?.params,
                headers: this.getHeaders()
            },
        )
        const data = response.data as BaseResponse<T[]>
        if (data.statusCode === 200) {

            return data
        }
        else {

            throw new Error(data.message)
        }
    }

    async getPaginateList(providerParams?: ProviderParams): Promise<PaginateResponse<T[]>> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(safeConf.resource, { params: option?.params, headers: this.getHeaders() })

        const data = response.data as PaginateResponse<T[]>
        console.log('Data Provider Response', data);
        return data
    }

    async getOne(providerParams?: ProviderParams): Promise<BaseResponse<T>> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.get(`${safeConf.resource}/${option?.id}`, {headers: this.getHeaders()})
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async create(providerParams?: ProviderParams): Promise<BaseResponse<T>> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.post(`${safeConf.resource}`, option?.params, {headers: this.getHeaders()})
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async update(providerParams?: ProviderParams): Promise<BaseResponse<T>> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.patch(`${safeConf.resource}/${option?.id}`, option?.params, {headers: this.getHeaders()})
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }

    async delete(providerParams?: ProviderParams): Promise<BaseResponse<T>> {
        const { configuration, option } = providerParams ? providerParams : { configuration: undefined, option: undefined }
        const safeConf = this.safeConfiguration(configuration)
        const response = await axiosInstance.delete(`${safeConf.resource}/${option?.id}`, {headers: this.getHeaders()})
        const data = response.data as BaseResponse<T>
        if (data.statusCode === 200) {
            return data
        }
        else {
            throw new Error(data.message)
        }
    }



}