const bookingsApi="/api/bookings/"
class bookingsService {
    static async getBookingsByAgeny(axiosInstance:any,agency_uuid:string) {
        try {
            const response = await axiosInstance.get(`${bookingsApi}vendor/${agency_uuid}`);
            
            return response;
        } catch (error) {
            console.log(error);
        }

    }


}

export default bookingsService;