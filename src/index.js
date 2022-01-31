import { CRUD_HTTP } from "./crud-http";


const presets = {

    base_url: 'http://',
    add_headers: {},
    axios_config: {}
    
};


export const initialize = ({

    base_url,
    add_headers,
    axios_config

} = presets) => CRUD_HTTP(

    base_url,
    add_headers,
    axios_config

);

export default initialize(presets);
