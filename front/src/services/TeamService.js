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
  },
  create: async (team) => {
    if (!team) return

    let response = await axiosInstance.post(`/teams`, { team: team })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/teams/${id}`)
    return response.data
  },
  update: async (id, team) => {
    if (!id && !team) return

    let response = await axiosInstance.put(`/teams/${id}`, { team: team })
    return response.data
  }
}

export default TeamService