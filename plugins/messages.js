const ERROR = {
    EMPTY: "빈 값을 채워주세요.",
    LOGIN: "아이디 혹은 비밀번호를 확인해주세요.",
    REGISTER: "사용할 수 없는 이메일 입니다. 다시 입력해 주세요.",
    EMAIL: "이메일 형식으로 입력해주세요.",
    REQUIRED: "필수 입력 값 입니다.",
}

const WELCOME_MESSAGES = [
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

const ALERT_MESSAGES = {
    DELETEALL: "시작이 반 입니다. 정말 모두 삭제하시겠습니까?",
    DELETE: "삭제하시겠습니까?",
    OVER21: "시작한지 21일이 지났습니다. 계속 도전하시는게 어때요? [확인]을 누르시면 삭제됩니다.",
    UNDER21: "일단 목표는 21일까지 꾸준히 해보는게 어때요? [확인]을 누르시면 삭제됩니다.", 
    
}

const INPUT = {
    TITLE_PLACEHOLDER: "습관으로 만들 것을 입력해보세요 :)",
    DATE_PLACEHOLDER: "START DATE"
}

export default ({ app }, inject) => {
    // Inject $MSG(msg) in Vue, context and store.
    inject('ERROR', () => {return ERROR})
    inject('WELCOME_MESSAGES', () => {return WELCOME_MESSAGES})
    inject('ALERT_MESSAGES', () => {return ALERT_MESSAGES})
    inject('INPUT', () => {return INPUT})
  }