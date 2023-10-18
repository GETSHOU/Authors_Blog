import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './PostItem.module.css';

export const PostItem = ({id, title, imageUrl, publishedAt, commentsCount}) => {
	return (
		<li className={styles.postItem}>
			<Link to={`/post/${id}`} className={styles.postLink}>
				<img className={styles.postImage} src={imageUrl} alt={title} />
				<div className={styles.postInfo}>
					<div className={styles.postInfoHeader}>
						<h2 className={styles.postTitle}>{title}</h2>
					</div>
					<div className={styles.postInfoCenter}>
						<div className={styles.postDate}>
							<h4 className={styles.postInfoTitle}>Дата публикации:</h4>
							<span className={styles.postInfoText}>{publishedAt}</span>
						</div>
					</div>
					<div className={styles.postInfoFooter}>
						<i className="fa fa-comment-o icon icon--light icon--1-5r" aria-hidden="true"></i>
						<div className={styles.postCommentsCount}>{commentsCount}</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

PostItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.string.isRequired,
};
