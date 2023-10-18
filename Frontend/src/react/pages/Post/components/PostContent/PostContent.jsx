import { PostToolsPanel } from '../PostToolsPanel/PostToolsPanel';
import { PROP_TYPE } from '../../../../../js/constants';
import styles from './PostContent.module.css';

export const PostContent = ({post: {id, title, publishedAt, imageUrl, content}}) => {
	return (
		<article className={styles.wrapper}>
			<header className={styles.header}>
				<PostToolsPanel postId={id} publishedAt={publishedAt}/>
			</header>
			<main className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.image}>
					<img src={imageUrl} alt={title} />
				</div>
				<div className={styles.text}>{content}</div>
			</main>
		</article>
	)
};

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
