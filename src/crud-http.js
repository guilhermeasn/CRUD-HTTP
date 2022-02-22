import axios from 'axios';

/**
 * CRUD-HTTP
 * 
 * @see https://github.com/guilhermeasn/CRUD-HTTP#readme
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
export function CRUD_HTTP(root_config, root_callback = (result, action) => {}) {

    return async (action, path = [], input = {}, config = {}, callback = result => {}) => {

        const http = axios.create((typeof root_config === 'function') ? root_config() : root_config);

        const location = path.join('/');
        const params   = input => input ? '?' + new URLSearchParams(input).toString() : '';
    
        const result = {
            response: {},
            success:  null,
            message:  '',
            error:    '',
            dataset:  [],
            data:     {},
            errors:   {}
        }
    
        try {
    
            switch(action) {
    
                case 'CREATE': case 'post':    result.response = await http.post(location, input, config);                break;
                case 'READ':   case 'get':     result.response = await http.get(location + params(input), config);        break;
                case 'UPDATE': case 'put':     result.response = await http.put(location, input, config);                 break;
                case 'DELETE': case 'delete':  result.response = await http.delete(location, { ...config, data: input }); break;
                               case 'path':    result.response = await http.patch(location, input, config);               break;
                               case 'head':    result.response = await http.head(location + params(input), config);       break;
                               case 'options': result.response = await http.options(location + params(input), config);    break;
        
                default: console.error('The CRUD function only accepts actions: CREATE, READ, UPDATE, DELETE, post, get, put, path, delete, head or options');
                
                throw new Error('An unexpected error occurred');
        
            }
    
            result.success = true;
    
        } catch(reject) {
    
            if(typeof reject.response !== 'undefined') result.response = reject.response;
            else {
                if(typeof reject === 'string') result.error = reject;
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
                if(typeof result.response.data.error   === 'string') result.error   = result.response.data.error;
                if(typeof result.response.data.errors  === 'object') result.errors  = result.response.data.errors;
                if(Array.isArray(result.response.data.dataset))      result.dataset = result.response.data.dataset;
    
                Object.keys(result.response.data).map(key => {

                    if(
                        (key !== 'dataset' || !Array.isArray(result.response.data[key]))     &&
                        (key !== 'message' || typeof result.response.data[key] !== 'string') &&
                        (key !== 'error'   || typeof result.response.data[key] !== 'string') &&
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
    
        if(typeof root_callback === 'function') root_callback(result, action);
        if(typeof callback === 'function') callback(result);

        return result;
    
    }

}
