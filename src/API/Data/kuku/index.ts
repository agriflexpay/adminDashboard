const kukuApi="/api/kukuplan"
class KukuService {
    static async  getKukuPlans(axiosInstance) {
    const response=await axiosInstance.get(`${kukuApi}/fetchAll`)
    return response.data.data;
  }

  static async createKukuPlan({ axiosInstance, data}) {
    const response =await axiosInstance.post(`${kukuApi}/create`, data);
    return response.data.data;
  }

  static async deleteKukuPlan({ axiosInstance, id }) {
    const response = axiosInstance.delete(`${kukuApi}/delete/${id}`);
    return response.data.data;
  }
  static async updateKukuPlan({ axiosInstance, data }) {
    const response = axiosInstance.put(`${kukuApi}/update`, data);
    return response.data.data;
  }
  static async getOneKukuPlan({axiosInstance,id}){
    const response = axiosInstance.get(`${kukuApi}/fetch/${id}`);
    return response.data.data;
  }
    static async getKukuPlanByDate({axiosInstance,date}){
        const response = axiosInstance.get(`${kukuApi}/fetchByDate/${date}`);
        return response.data.data;
    }

}

export default KukuService;