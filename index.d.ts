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

declare function CRUD(
    action: string,
    path:   Array<string | number>,
    data:   object,
    config: AxiosRequestConfig<object>
) : Promise<CrudHttpResult>;

export default CRUD;

export function initialize(config?: AxiosRequestConfig<object>) : typeof CRUD;
