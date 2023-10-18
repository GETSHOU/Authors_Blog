import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { closeModal, openModal, removePostAsync, savePostAsync } from '../../../../store/actions';
import { userRoleSelector } from '../../../../store/selectors';
import { checkAccess } from '../../../../../js/utils';
import { ROLES } from '../../../../../js/constants';
import styles from './PostToolsPanel.module.css';

export const PostToolsPanel = ({
	postId,
	publishedAt,
	contentRef,
	fieldValueTitle,
	fieldValueImageUrl,
}) => {

	const userRole = useSelector(userRoleSelector);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');

	const handlerSave = (id) => {
		const newContent = contentRef.current.innerText;

		dispatch(savePostAsync(requestServer, {
				id,
				content: newContent,
				title: fieldValueTitle,
				imageUrl: fieldValueImageUrl,
			})
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const handlerConfirm = (id) => {
		return () => {
			dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'));
			dispatch(closeModal());
		};
	};

	const handlerCancel = () => dispatch(closeModal());

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				title: 'Удалить пост?',
				buttons: [
					{
						text: 'Да',
						handler: handlerConfirm(id),
					},
					{
						text: 'Отменить',
						handler: handlerCancel,
					}
				],
			})
		)
	};

	const handlerEdit = (id) => navigate(`/post/${id}/edit`);

	const isAdmin = checkAccess([ROLES.ADMIN], userRole);

	return (
		<div className={styles.wrapper}>
			{isCreating ? (<h2 className={styles.title}>Новая статья</h2>)
				: isEditing ? (<h2 className={styles.title}>Редактирование статьи</h2>)
				: (<div className={styles.postInfo}>
						<span className={`${styles.postInfoText} ${styles.postDate}`}>{`Дата публикации: ${publishedAt}`}</span>
					</div>)
			}
			{isAdmin &&
				(<>
					<div className={styles.tools}>
						{ isCreating || isEditing
							? (<button className={styles.button} onClick={() => handlerSave(postId)}>
									<i className='fa fa-floppy-o icon icon--save icon--1-5r' aria-hidden='true'></i>
								</button>)
							: (<button className={styles.button} onClick={() => handlerEdit(postId)}>
									<i className='fa fa-pencil-square-o icon icon--edit icon--1-5r' aria-hidden='true'></i>
								</button>)
						}
						{ !isCreating
							? (<button className={styles.button} onClick={() => onPostRemove(postId)}>
									<i className='fa fa-trash-o icon icon--trash icon--1-5r' aria-hidden='true'></i>
								</button>)
							: null
						}
					</div>
				</>)
			}
		</div>
	)
};

PostToolsPanel.propTypes = {
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	fieldValueTitle: PropTypes.string,
	fieldValueImageUrl: PropTypes.string,
};
