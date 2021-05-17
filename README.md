<div align="center">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width=100>
    <h1>
        API 100% NodeJS
    </h1>
    <h4>
        Uma api sem dependências!
    </h4>
</div>

## Como usar
```bash
# Clone this repository
$ git clone https://github.com/joaovictornsv/http-node-api

# Go into the repository
$ cd http-node-api

# Run the server
$ yarn start
```

<hr>

## Rotas

**![](https://img.shields.io/badge/get-BD93F9.svg?&style=for-the-badge&logoColor=white)**

- Home page

```
/
```

- Get all users

```
/users
```

- Get a specific user
```
/users/:id
```

<hr>

**![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)**
- Create a user

```
users/data?...

Search params:
- name
- email
- age
- city
```

<hr>

**![](https://img.shields.io/badge/put-FFB86C.svg?&style=for-the-badge&logoColor=white)**
- Update a user

```
users/:id/data?...

Search params:
- name
- email
- age
- city
```

<hr>

**![](https://img.shields.io/badge/delete-FF4D4B.svg?&style=for-the-badge&logoColor=white)**

- Delete a user

```
/users/:id
```

