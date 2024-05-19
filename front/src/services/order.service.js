// import axios from 'api/interceptors'

import { axiosClassic } from '../api/interceptors'
import { getOrderUrl } from '../configs/api.config'

export const OrderService = {
  // async create() {
  //   return axios.post(getMoviesUrl(''))
  // },
  // async create() {
  //   return axiosClassic.post(getMoviesUrl(''))
  // }
  async getAll() {
    return axiosClassic.get(getOrderUrl(``), {
      params: {}
    })
  }

  // async getMostPopularMovies() {
  // 	// Не отдавать data а то будет data.data лучше вот так data: movies
  // 	const { data: movies } = await axiosClassic.get<IMovie[]>(
  // 		getMoviesUrl(`/most-popular`)
  // 	)

  // 	return movies
  // },

  // async getBySlug(slug: string) {
  // 	return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
  // },

  // async getByActor(actorId: string) {
  // 	return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
  // },

  // Почему тут POST запрос а не гет говорит на 16:00 26 урок, Это у него лайв-хак такой он его и на beck-end замутил. Что бы передавать не в адресной строке, а в body
  // async getByGenres(genreIds: string[]) {
  // 	return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
  // 		genreIds,
  // 	})
  // },
  // update-count-opened
  // async updateCountOpened(slug: string) {
  // 	return axiosClassic.put(getMoviesUrl('/update-count-opened'), {
  // 		slug,
  // 	})
  // },

  // axios только для админа, axiosClassic для всех
  // async getById(_id: string) {
  // 	return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
  // },

  // async update(_id: string, data: IMovieEditInput) {
  // 	return axios.put<string>(getMoviesUrl(`/${_id}`), data)
  // },

  // async delete(_id: string) {
  // 	return axios.delete<string>(getMoviesUrl(`/${_id}`))
  // },
}
