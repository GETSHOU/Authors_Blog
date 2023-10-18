import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync, resetPostData } from '../../store/actions';
import { postSelector } from '../../store/selectors';
import { ROLES } from '../../../constants';
import { PostContent, Comments, PostForm } from './components';
import { Error, PrivateContent } from '../../components';
import styles from './Post.module.css';

export const Post = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const params = useParams();
	const post = useSelector(postSelector);

	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');

	useLayoutEffect(() => {
		dispatch(resetPostData);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing
			? (
					<PrivateContent access={[ROLES.ADMIN]} serverError={error}>
							<div className={styles.wrapper}>
								<PostForm post={post}/>
							</div>
					</PrivateContent>
				)
			: (
					<div className={styles.wrapper}>
						<PostContent post={post} />
						<Comments comments={post.comments} postId={post.id}/>
					</div>
				);

	return error ? <Error error={error}/> : SpecificPostPage
};
