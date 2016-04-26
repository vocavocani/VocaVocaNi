/**
 * Created by kingw on 2016-04-24.
 */
module.exports = {
  "400": {
    "status": 400,
    "message": "잘못된 요청입니다.",
    "description": "Bad Request"
  },

  "401": {
    "status": 401,
    "message": "토큰 인증에 실패하였습니다.",
    "description": "False token"
  },

  "500": {
    "status": 500,
    "message": "내부 서버 오류",
    "description": "Internal Server Error"
  },

  "9401": {
    "status": 400,
    "message": "파라미터가 잘못되었습니다.",
    "description": "invalid parameter"
  },

  // User Error Code
  "1401": {
    "status": 200,  // Exception
    "message": "아이디가 중복됩니다.",
    "description": "Exist Email"
  },

  "1402": {
    "status": 200, // Exception
    "message": "아이디가 존재하지 않습니다.",
    "description": "Not Registration ID"
  },

  "1403": {
    "status": 200, // Exception
    "message": "비밀번호가 틀렸습니다.",
    "description": "id password not match"
  }
};