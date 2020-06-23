import { HOST } from '~/interface/host'
import { Github } from '~/interface/github'

import axios from 'axios'

const client = axios.create()
client.defaults.baseURL = process.env.NODE_ENV === 'development' ? HOST.DEV_CLIENT : HOST.CLIENT
client.interceptors.response.use(
  async res => {
    return res.data
  },
  (err: any) => Promise.reject(err),
)

export const github = {
  async search(keyword: string): Promise<{ items: Github.Issue[] }> {
    return client.get(`/search`, { params: { keyword } })
  },
  async labels(page?: number): Promise<Github.Label[]> {
    return client.get(`/labels`, { params: { page } })
  },
  async issues({
    label,
    sort = 'updated',
  }: {
    label?: string
    sort?: 'updated'
  }): Promise<Github.Issue[]> {
    return client.get(`/sheet`, { params: { label, sort } })
  },
}
