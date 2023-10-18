import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { closeModal, openModal, removeCommentAsync } from '../../../../../../store/actions';
import { userRoleSelector } from '../../../../../../store/selectors';
import { checkAccess } from '../../../../../../../js/utils';
import { ROLES } from '../../../../../../../js/constants';
import { Avatar } from '../../../../../../components';
import styles from './Comment.module.css';

export const Comment = ({ postId, commentId, author, content, publishedAt }) => {
	const userRole = useSelector(userRoleSelector);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const handlerConfirm = (postId, commentId) => {
		return () => {
			dispatch(removeCommentAsync(requestServer, postId, commentId));
			dispatch(closeModal());
		};
	};

	const handlerCancel = () => dispatch(closeModal());

	const onCommentRemove = (postId, commentId) => {
		dispatch(
			openModal({
				title: 'Удалить комментарий?',
				buttons: [
					{
						text: 'Да',
						handler: handlerConfirm(postId, commentId),
					},
					{
						text: 'Отменить',
						handler: handlerCancel,
					}
				],
			})
		)
	};

	const isAdminOrModerator = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], userRole);

	return (
		<div className={styles.commentWrapper}>
			<div className={styles.commentAvatar}>
				<Avatar />
			</div>
			<div className={styles.commentContent}>
				<header className={styles.commentHeader}>
					<div className={styles.commentAuthor}>{author}</div>
					{
						isAdminOrModerator && (
									<div className={styles.commentActions}>
										<button className={styles.actionButton} onClick={() => onCommentRemove(postId, commentId)}>
											<i className='fa fa-trash-o icon icon--trash icon--1-5r' aria-hidden='true'></i>
										</button>
									</div>
								)
					}
				</header>
				<div className={styles.commentText}>{content}</div>
				<footer className={styles.commentFooter}>
					<span className={styles.commentDate}>{publishedAt}</span>
				</footer>
			</div>
		</div>
	)
};

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	commentId: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
}
