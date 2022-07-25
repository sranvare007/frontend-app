import { NetworkConstants } from "./networkConstants";
import { Urls } from "./urls";
import axios, { AxiosResponse } from "axios";

export class NetworkProvider {
  protected async get(
    url: string,
    headers?: object
  ): Promise<Record<string, string>> {
    const axiosInstance = this.getAxiosInstance(headers);
    let response = {} as AxiosResponse;
    try {
      response = await axiosInstance.get(url);
    } catch (e: any) {
      if (e != null) response = e.response;
      else if (e.request != null) response = e.request;
    }
    return response.data;
  }

  protected async post(
    url: string,
    params: object,
    headers?: object
  ): Promise<Record<string, string>> {
    const axiosInstance = this.getAxiosInstance(headers);
    let response: AxiosResponse = {} as AxiosResponse;
    try {
      response = await axiosInstance.post(url, params);
    } catch (e: any) {
      if (e != null) response = e.response;
      else if (e.request != null) response = e.request;
    }
    return response.data;
  }

  protected async delete(
    url: string,
    headers?: object
  ): Promise<Record<string, string>> {
    const axiosInstance = this.getAxiosInstance(headers);
    let response = {} as AxiosResponse;
    try {
      response = await axiosInstance.delete(url);
    } catch (e: any) {
      if (e != null) response = e.response;
      else if (e.request != null) response = e.request;
    }
    return response.data;
  }

  protected async put(
    url: string,
    params: object,
    headers?: object
  ): Promise<Record<string, string>> {
    const axiosInstance = this.getAxiosInstance(headers);
    let response: AxiosResponse = {} as AxiosResponse;
    try {
      response = await axiosInstance.put(url, params);
    } catch (e: any) {
      if (e != null) response = e.response;
      else if (e.request != null) response = e.request;
    }
    return response.data;
  }

  private getAxiosInstance(headers: object = {}) {
    const instance = axios.create({
      baseURL: Urls.baseUrl,
      headers: {
        "content-type": NetworkConstants.CONTENT_TYPE,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        ...headers,
      },
      timeout: NetworkConstants.NETWORK_TIMEOUT,
    });
    return instance;
  }
}
