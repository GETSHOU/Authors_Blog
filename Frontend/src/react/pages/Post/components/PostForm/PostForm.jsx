import { useLayoutEffect, useRef, useState } from 'react';
import { PROP_TYPE } from '../../../../../js/constants';
import { PostToolsPanel } from '../PostToolsPanel/PostToolsPanel';
import styles from './PostForm.module.css';


export const PostForm = ({post: {id, title, publishedAt, imageUrl, content}}) => {
	const [fieldValueImageUrl, setFieldValueImageUrl] = useState(imageUrl);
	const [fieldValueTitle, setFieldValueTitle] = useState(title);

	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setFieldValueTitle(title);
		setFieldValueImageUrl(imageUrl);
	}, [title, imageUrl]);

	const handlerChangeImage = ({ target }) => setFieldValueImageUrl(target.value);
	const handlerChangeTitle = ({ target }) => setFieldValueTitle(target.value);

	return (
		<article className={styles.wrapper}>
			<header className={styles.header}>
				<PostToolsPanel postId={id} publishedAt={publishedAt} contentRef={contentRef} fieldValueTitle={fieldValueTitle} fieldValueImageUrl={fieldValueImageUrl}/>
			</header>
			<main className={styles.content}>
				<div className={styles.wrapper}>
					<div className={styles.fields}>
						<input className={styles.input} type="text" value={fieldValueTitle} placeholder='Заголовок...' onChange={handlerChangeTitle} />
						<input className={styles.input} type="text" value={fieldValueImageUrl} placeholder='Изображение...' onChange={handlerChangeImage} />
					</div>
					<div className={`${styles.text} ${styles.textEdit}`} role='textbox' aria-multiline='true' ref={contentRef} contentEditable={true} suppressContentEditableWarning>{content}</div>
				</div>
			</main>
		</article>
	)
};

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
