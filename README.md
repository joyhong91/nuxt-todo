
# TODO for 66days

흔하디 흔한 TODO app이지만, 극J 성향인 저 포함 여러 사람들에게 흔한만큼 없어서는 안될 습관 관리 툴 입니다.

나를 위한 좋은 습관을 만들고 작은거 하나하나 부터 체크하며 행하게 되면 몸이 습관에 적응할 때까지 21일.. 몸에 베이기 까지 66일이 걸린다고 합니다. 

'뭐부터해야하지..' 하며 시작이 어려울 수 있습니다.   커대란 계획보다는 당장 앞 사소한 계획부터 실행하게 되면서 성취감과 자신감이 올라가게 됩니다. 

각 `MODEL`기반 CRUD 기능입니다. (부가적인 기능은 아직 작업 중입니다.)



## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```



## Setting
`Nuxt(SSR)`, `express.js`, `mongoDB(mongoose)`, `javascript` 

경험 협업툴: `slack` `jira` |
디자인 협업툴: `Sketch` `Invision` 

## /api 
### Models
`User`: name, email, password

`Todo`: userId(ref: user), title, startAt, isDone

`Point`: userId(ref: user), todoIds, amount

### Routers
`User`: 로그인, 회원가입

`Todo`: /addTodo /getTodosByUserId, /updateIsDone, /updateTodo, /deleteTodoById, /deleteMany

`Point` /createPoint, /getPointByUserId, /updatePoint, /resetPoint

###  functions
- 로그인 or 회원가입(회원가입 후 로그인)
- header carousel(dot, nav :false)
- todo 입력 (시작일 지정)
    - row를 클릭하면 완료 처리 (완료 서브 탭에서도 확인가능)
    - 완료, 미완료 처리시 진행률 dashboard
    - 완료 처리시 point는 2p씩 증가 
    - 완료된 row를 다시 클릭하면 todo로 (point는 -2p)
    - ** Todo, Done 서브 탭은 시작 날짜가 오늘 이상인 유효한 것들만 로딩 (all 서브탭에서는 다 확인 가능 단,유효하지 않은 것들은 disabled)
    - Todo 수정
    - Todo 삭제 
    




## Components
auth > login, register


Todo>dashboard, input, list

footer>

