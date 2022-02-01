import { CRUD_HTTP } from "./crud-http.js";


const presets = {

    base_url: 'http://',
    add_headers: {},
    axios_config: {}
    
};


export const initialize = ( configs = {} ) =>  {

    const params = { ...presets, ...configs };

    return CRUD_HTTP(

        params.base_url,
        params.add_headers,
        params.axios_config
    
    );
    
};

export default initialize(presets);
