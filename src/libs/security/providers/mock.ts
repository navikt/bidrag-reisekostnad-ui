import {JWTVerifyResult,} from "jose";
import {decodeJwt} from "jose";
import {MockProvider} from "./AuthProvider";

const mockToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2NjkxOTQ3MTYsImV4cCI6MTcwMDczMDcxNiwiYXVkIjoiIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInBpZCI6IjEyMzQ1Njc4OTEwIn0.7uVguLkvZ3eBzHd0lBjSTkq8IZACVQxvmQ6QIOk1eCE"

async function verifyToken(
    token: string | Uint8Array
): Promise<JWTVerifyResult> {
  return {
    payload: decodeJwt(mockToken),
    protectedHeader: {
      alg: "mock"
    }
  }
}

const mockTokenProvider: MockProvider = {
  name: "mock",
  getToken: ()=>mockToken,
  verifyToken,
};
export default mockTokenProvider