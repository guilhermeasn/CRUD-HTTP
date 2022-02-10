# CRUD-HTTP

Pacote para JavaScript node frontend para fazer requisições a uma API via HTTP com o paradigma CRUD (create, read, update, delete). Gerando um código fonte limpo e organizado. Ele retorna dados concisos e padronizados, tem uma variavel de controle de sucesso não exigindo o uso de try...catch... assim tornando o seu código de requisições http mais enxuto e fácil de ler.

## 🔍 Exemplos de Uso

 - Usando com ```async/await```:

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

 - Usando com ```promise```:

```
CRUD('READ', [
    'api', 'company', 1, 'message', 10
]).then(( { success, data } ) => {
    // your code here
});
```

## 🚀 Instalação

Execute no terminal o comando abaixo para instalar o **crud-http** no seu projeto

```
npm install crud-http --save
```

## 🛠️ Implementação

Para usar o crud-http é recomendável fazer um arquivo de configuração, como no exemplo abaixo:

 ```
import { initialize } from 'crud-http';

export const CRUD = initialize({

    baseURL: 'http://your_api_serve.com',
    headers: {
        Accept: 'application/json',
    }

});
 ```

O **crud-http** utiliza uma instância do pacote ```axios```. As opções de configurações são as mesmas. Veja as possíveis configurações em [Axios Request Config](https://axios-http.com/docs/req_config).

Agora basta importar o CRUD do seu arquivo de configuração:
```
import { CRUD } from './config';
```

Caso não precise fazer nenhuma configuração poderá importar o método CRUD diretamente:

```
import CRUD from 'crud-http';
```

### Parâmetros de CRUD

```
CRUD( action: string, path: Array<string|numeric>, data: object, config: object ): Promise<object>
```

 - **action**: uma *string* com um verbo http (```'get'```, ```'post'```, ```'put'```, ```'path'```, ```'delete'```, ```'head'``` ou ```'options'```) ou com um alias (```'CREATE'``` alias de *post*, ```'READ'``` alias de *get*, ```'UPDATE'``` alias de *put*, ```'DELETE'``` alias de *delete*), esse dado é *case sensitive*.
 - **path**: um *array* com o restante do caminho da *api*, por exemplo ```[ 'user', 3, 'comment', 1 ]```.
 - **data**: um *object* com os dados a serem transmitidas para a *api* durante a requisição.
 - **config**: um *object* com configurações. Veja as configurações possíveis em [Axios Request Config](https://axios-http.com/docs/req_config).

### Retorno de CRUD

CRUD é assincrono, após o processamento, retorna um objeto contendo as seguintes chaves, com tipagem garantida:

 - **success**: ```bool | null```
 - **message**: ```string```
 - **error**: ```string```
 - **errors**: ```object```
 - **dataset**: ```array```
 - **data**: ```object```
 - **response**: ```any```

### Resultado de **success**

 - **true**: requisição concluída com sucesso. ```HTTP status code 2xx```.
 - **false**: erros do usuário. ```HTTP status code 4xx```.
 - **null**: erros do servidor e demais tipos de erros.

### Distribuição dos dados de resposta

 Se os dados da resposta for um *array* ele será retornado em ```dataset```, se for um *string* ele será retornado em ```message```, se for um *objeto* será distribuído da seguinte forma:

 - **message**: se houver uma chave ```message``` *string*.
 - **error**: se houver uma chave ```error``` *string*.
 - **errors**: se houver uma chave ```errors``` *object*.
 - **dataset**: se houver uma chave ```dataset``` *array*.
 - **data**: forma um *object* com as demais chaves.
 
 Se os dados da resposta for de outro tipo, como numérico ou nulo, será retornado em ```data.result```

 A chave ```response``` conterá a resposta de tada a requisição.

## ✒️ Autor

  **Guilherme Neves** - [repositórios github](https://github.com/guilhermeasn/)

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](https://github.com/guilhermeasn/CRUD-HTTP/blob/master/LICENSE) para detalhes.
