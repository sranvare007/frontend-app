import { NetworkProvider } from "./networkProvider";

export class NetworkManager extends NetworkProvider {
  async loginUser(url: string, params: object) {
    return super.post(url, params);
  }

  async signupUser(url: string, params: object) {
    return super.post(url, params);
  }

  async getStudentList(url: string) {
    return super.get(url);
  }

  async deleteStudentDetails(url: string) {
    return super.delete(url);
  }

  async insertStudentDetails(url: string, params: object) {
    return super.post(url, params);
  }

  async editStudentDetails(url: string, params: object) {
    return super.put(url, params);
  }

  async getStudentDetails(url: string) {
    return super.get(url);
  }

  async insertRecruitmentDetails(url: string, params: object) {
    return super.post(url, params);
  }

  async getRecruitmentList(url: string) {
    return super.get(url);
  }

  async getRecruitmentDetails(url: string) {
    return super.get(url);
  }

  async sendOutEmail(url: string, params: object) {
    return super.post(url, params);
  }
}
