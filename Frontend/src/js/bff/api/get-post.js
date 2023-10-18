import { BASE_SERVER_URL, END_POINT } from '../../services';
import { postTransform } from '../transformers';

export const getPost = async (postId) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.POSTS}/${postId}`)
		.then((response) => {
			if (response.ok) {
				return response;
			}

			const error =
				response.status === 404
					? 'API getPost: Страница не найдена!'
					: 'API getPost: Что-то пошло не так! Попробуйте еще раз позднее';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && postTransform(loadedPost));
