import axios from 'axios';


export const initialize = ({

    base_url = 'http://',
    add_headers = {},
    axios_config = {}
    
}) => {

    const http = axios.create({
        baseURL: base_url,
        headers: {
            Accept: 'application/json',
            ...add_headers
        },
        ...axios_config
    });

    const CRUD = async (mode, path = [], input = {}) => {

        const location = path.join('/');
        const params   = input => input ? '?' + new URLSearchParams(input).toString() : '';
    
        const result = {
            response: {},
            success:  null,
            message:  '',
            dataset:  [],
            data:     {},
            errors:   {}
        }
    
        try {
    
            switch(mode) {
    
                case 'CREATE': case 'post':    result.response = await http.post(location, input);             break;
                case 'READ':   case 'get':     result.response = await http.get(location + params(input));     break;
                case 'UPDATE': case 'put':     result.response = await http.put(location, input);              break;
                case 'DELETE': case 'delete':  result.response = await http.delete(location, { data: input }); break;
                               case 'path':    result.response = await http.patch(location, input);            break;
                               case 'head':    result.response = await http.head(location + params(input));    break;
                               case 'options': result.response = await http.options(location + params(input)); break;
        
                default: console.error('The CRUD function only accepts the modes: CREATE, READ, UPDATE, DELETE, post, get, put, path, delete, head or options');
                
                throw new Error('Ocorreu um erro inesperado!');
        
            }
    
            result.success = true;
    
        } catch(reject) {
    
            if(typeof reject.response !== 'undefined') result.response = reject.response;
            else {
                result.message  = (typeof reject === 'string') ? reject : 'Ocorreu um erro desconhecido!';
                result.response = reject;
            }
    
        }
    
        if(typeof result.response.status !== 'undefined' && /^4\d\d$/.test(result.response.status)) {
            result.success = false;
        }
    
        if(typeof result.response.data !== 'undefined') {
    
            if(Array.isArray(result.response.data)) result.dataset = result.response.data;
            else if(typeof result.response.data === 'string') result.message = result.response.data;
            else if(typeof result.response.data === 'object') {
    
                if(typeof result.response.data.message === 'string') result.message = result.response.data.message;
                if(typeof result.response.data.errors  === 'object') result.errors  = result.response.data.errors;
                if(Array.isArray(result.response.data.dataset))      result.dataset = result.response.data.dataset;
    
                Object.keys(result.response.data).map(key => {

                    if(
                        (key !== 'dataset' || !Array.isArray(result.response.data[key]))     &&
                        (key !== 'message' || typeof result.response.data[key] !== 'string') &&
                        (key !== 'errors'  || typeof result.response.data[key] !== 'object')
                    ) {
                        result.data = {
                            ...result.data,
                            [key]: result.response.data[key]
                        }
                    }

                });
                
            } else result.data = { 'result': result.response.data };
            
        }
    
        return result;
    
    }

    return CRUD;

}

export default initialize();
