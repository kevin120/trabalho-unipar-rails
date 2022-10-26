import axiosInstance from "../utils/axios"

const PlayerService = {
  getAll: async () => {
    let response = await axiosInstance.get('/players')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/players/${id}`)
    return response.data
  },
  create: async (player) => {
    if (!player) return

    let response = await axiosInstance.post(`/players`, { player: player })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/players/${id}`)
    return response.data
  },
  update: async (id, player) => {
    if (!id && !player) return

    let response = await axiosInstance.put(`/players/${id}`, { player: player })
    return response.data
  }

}

export default PlayerService