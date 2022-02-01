# CRUD-HTTP

Package for JavaScript node frontend to make requests to API HTTP with the CRUD paradigm (create, read, update, delete). Generating a clean and organized source code. It returns concise and standardized data, has a success control variable not requiring the use of try...catch... thus making your http request code leaner and easier to read.

## 🔍 Examples of Use

 - Using with ```async/await```:

```
const { success, message, errors } = await CRUD('CREATE', [
    'api', 'company', 1, 'vehicle'
], {
    brand: 'VW',
    model: 'Saveiro Trooper'
});
```

```
const { success, dataset } = await CRUD('READ', [
    'api', 'company', 1, 'message'
]);
```

```
const { success, message, errors } = await CRUD('UPDATE', [
    'api', 'company', 1, 'domain', 3
], {
    url: 'abcde.com.br'
});
```

```
const { success, message } = await CRUD('DELETE', [
    'api', 'company', 1, 'history', 5
]);
```

 - Using with ```promise```:

```
CRUD('READ', [
    'api', 'company', 1, 'message', 10
]).then(( { success, data } ) => {
    // your code here
});
```

## 🚀 Installation

Run the command below in the terminal to install **crud-http** in your project

```
npm install crud-http --save
```

## 🛠️ Implementation

To use crud-http it is recommended to make a configuration file, as in the example below:

 ```
import { initialize } from 'crud-http';

export const CRUD = initialize({

    baseURL: 'http://your_api_serve.com',
    headers: {
        Accept: 'application/json',
    }

});
 ```

**crud-http** uses an instance of the ```axios``` package. The settings options are the same. See possible settings in [Axios Request Config](https://axios-http.com/docs/req_config).

Now just import the CRUD from your configuration file:

```
import { CRUD } from './config';
```

If you don't need to do any configuration, you can import the CRUD method directly:

```
import CRUD from 'crud-http';
```

### CRUD parameters

```
CRUD( action: string, path: Array<string|numeric>, data: object ): Promise<object>
```

- **action**: a *string* with an http verb (```'get'```, ```'post'```, ```'put'```, ```' path'```, ```'delete'```, ```'head'``` or ```'options'```) or with an alias (```'CREATE'``` alias *post*, ```'READ'``` alias *get*, ```'UPDATE'``` alias *put* , ```'DELETE'``` alias *delete*), this data is *case sensitive*.
 - **path**: an *array* with the rest of the *api* path, for example ```[ 'user', 3, 'comment', 1 ]```.
 - **data**: an *object* with the data to be transmitted to the *api* during the request.

### CRUD return

CRUD is asynchronous, after processing, it returns an object containing the following keys, with guaranteed typing:

 - **success**: ```bool | null```
 - **message**: ```string```
 - **error**: ```string```
 - **errors**: ```object```
 - **dataset**: ```array```
 - **data**: ```object```
 - **response**: ```any```

### Result of **success**

 - **true**: request completed successfully. ```HTTP status code 2xx```.
 - **false**: user errors. ```HTTP status code 4xx```.
 - **null**: server errors and other types of errors.

### Distribution of response data

If the response data is an *array* it will be returned in ```dataset```, if it is a *string* it will be returned in ```message```, if it is an *object* it will be distributed as follows form:

 - **message**: if there is a key ```message``` *string*.
 - **error**: if there is a key ```error``` *string*.
 - **errors**: if there is a key ```errors``` *string*.
 - **dataset**: if there is a key ```dataset``` *array*.
 - **data**: forms an *object* with the other keys.
 
If the response data is of another type, such as numeric or null, it will be returned in ```data.result```

The ```response``` key will contain the response to each request.

## ✒️ Author

  **Guilherme Neves** - [repositórios github](https://github.com/guilhermeasn/)

## 📄 License

This project is under the MIT license - see the [LICENSE](https://github.com/guilhermeasn/CRUD-HTTP/blob/master/LICENSE) file for details.
