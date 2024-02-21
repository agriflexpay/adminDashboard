const plansAPI = "/api/businessplan"

class PlanService {
    static async getPlansByAgency(axiosInstance:any) {
        const response = await axiosInstance.get(`${plansAPI}/fetchAll`)
        return response.data.data;
    }

    static async createPlan({ axiosInstance, data }:{axiosInstance:any, data:any}) {
        const response = await axiosInstance.post(`${plansAPI}/create`, data);
        return response.data.data;
    }

    static async deletePlan({ axiosInstance, id }: { axiosInstance: any, id: string }) {
        const response =await axiosInstance.delete(`${plansAPI}/${id}`);
        console.log(response);
        return response?.data?.data;
    }
    static async getOnePlan({ axiosInstance, id }: { axiosInstance: any, id: string }) {
        const response =await axiosInstance.get(`${plansAPI}/plan/${id}`);
        return response.data
    }
    static async getPlanByDate({ axiosInstance, date }: { axiosInstance: any, date: string }) {
        const response =await axiosInstance.get(`${plansAPI}/fetchByDate/${date}`);
        return response.data.data;
    }
    static async fetchPlanByAgency({ axiosInstance, agency_uuid }: { axiosInstance: any, agency_uuid: string }) {
        const response =await axiosInstance.get(`${plansAPI}/agency/${agency_uuid}`);
        return response?.data?.data;
    }

}

export default PlanService;