const ERROR = {
    EMPTY: "빈 값을 채워주세요.",
    LOGIN: "아이디 혹은 비밀번호를 확인해주세요.",
    REGISTER: "사용할 수 없는 이메일 입니다. 다시 입력해 주세요.",
    EMAIL: "이메일 형식으로 입력해주세요.",
    REQUIRED: "필수 입력 값 입니다.",
}

const WELCOME_MESSAGES = [
    "명성을 쌓는 것에는 20년이란 세월이 걸리며 명성을 무너뜨리는 것에는 5분도 걸리지 않는다. 그걸 명심한다면 당신의 행동이 달라질 것이다. [워렌버핏]",
    "간단함이 훌륭함의 열쇠다. [이소룡]",
    "승리하면 조금 배울 수 있고, 패배하면 모든 것을 배울 수 있다. [크리스티 메튜슨]",
    "승자는 책임지는 태도로 살며, 패자는 약속을 남발한다. [유태경전]", 
    "말만 하고 행동하지 않는 사람은 잡초로 가득 찬 정원과 같다. [하우얼]",
    "내 자신의 무식을 아는 것은 지식으로의 첫걸음이다. [바이런]",
    "가시에 찔리지 않고서는 장미를 모을 수 없다. [핀페이]",
    "고통을 거치지 않고 얻은 승리는 영광이 아니다. [나폴레옹]",
    "기와 한 장 아껴서 대들보 썩는다. [한국속담]",
    "바람이 불지 않으면 노를 저어라. [윈스턴 처칠]",
]


export default ({ app }, inject) => {
    // Inject $MSG(msg) in Vue, context and store.
    inject('ERROR', () => {return ERROR})
    inject('WELCOME_MESSAGES', () => {return WELCOME_MESSAGES})
  }