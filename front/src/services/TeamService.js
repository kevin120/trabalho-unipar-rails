import axiosInstance from "../utils/axios"

const TeamService = {
  getAll: async () => {
    let response = await axiosInstance.get('/teams')
    return response.data;
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/teams/${id}`)
    return response.data
  }
}

export default TeamService