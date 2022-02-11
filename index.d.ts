import { AxiosRequestConfig } from "axios";


export interface CrudHttpResult {

    success:  boolean | null;
    message:  string;
    error:    string;
    errors:   object;
    dataset:  Array<any>;
    data:     object;
    response: any;

}

export interface CrudHttpCallbackConfig {
    () : AxiosRequestConfig<object>;
}

declare function CRUD(
    action: string,
    path:   Array<string | number>,
    data:   object,
    config: AxiosRequestConfig<object>
) : Promise<CrudHttpResult>;

export default CRUD;

export function initialize(root_config?: AxiosRequestConfig<object> | CrudHttpCallbackConfig) : typeof CRUD;
