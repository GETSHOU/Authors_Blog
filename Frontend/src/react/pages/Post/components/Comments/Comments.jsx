import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync } from '../../../../store/actions';
import { userRoleSelector } from '../../../../store/selectors';
import { PROP_TYPE, ROLES } from '../../../../../constants';
import { getCommentsCount } from '../../../../../utils';
import { checkAccess } from '../../../../../utils';
import { Comment } from './components';
import styles from './Comments.module.css';

export const Comments = ({comments, postId}) => {
	const [ newComment, setNewComment ] = useState('');

	const roleId = useSelector(userRoleSelector);
	const dispatch = useDispatch();

	const isGuest = checkAccess([ROLES.GUEST], roleId);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	}

	return (
		<div className={styles.commentsWrapper}>
			{!isGuest && <div className={styles.commentsField}>
				<textarea className={styles.commentsTextArea} name='comment' placeholder='Написать комментарий...' value={newComment}  onChange={({target}) => setNewComment(target.value)} rows='6' />
				<button className={styles.sendButton} onClick={() => onNewCommentAdd(postId, newComment)}>
					<i className="fa fa-paper-plane icon icon--1-5r icon--light" aria-hidden="true"></i>
				</button>
			</div>}
			<div className={styles.commentsCounter}>{getCommentsCount(comments.length)}</div>
			<div className={styles.divider}></div>
			<div className={styles.commentsList}>
				{comments.map(({id, author, content, publishedAt}) => {
					return (
						<Comment
							key={id}
							postId={postId}
							commentId={id}
							author={author}
							content={content}
							publishedAt={publishedAt}
						/>
					)
				})}
			</div>
		</div>
	)
};

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
