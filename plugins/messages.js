const ERROR = {
    EMPTY: "빈 값을 채워주세요.",
    LOGIN: "아이디 혹은 비밀번호를 확인해주세요.",
    REGISTER: "사용할 수 없는 이메일 입니다. 다시 입력해 주세요."
}


export default ({ app }, inject) => {
    // Inject $MSG(msg) in Vue, context and store.
    inject('ERROR', () => {return ERROR})
    inject('MESSAGES', () => {return "MESSAGES"})
  }