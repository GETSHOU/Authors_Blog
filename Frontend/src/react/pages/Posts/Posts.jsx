import { useEffect, useState, useMemo } from 'react';
import { request, debounce } from '../../../utils';
import { PAGINATION } from '../../../constants/';
import { PostItem } from './components';
import { Pagination, SearchField } from './components';
import styles from './Posts.module.css';

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(`/posts?search=${searchQuery}&page=${page}&limit=${PAGINATION.limitOfElementsPerPage}`)
			.then(({ data: { posts, lastPage } }) => {
				setPosts(posts);
				setLastPage(lastPage);
			});
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchQuery(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={styles.wrapper}>
			<SearchField searchQuery={searchQuery} onSearch={onSearch}/>
			<div className={styles.postsWrapper}>
				{posts.length > 0
					? (<ul className={styles.postList}>
							{posts.map(({id, title, imageUrl, publishedAt, comments}, i) => (
								<PostItem
									key={i}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>)
							)}
						</ul>)
					: (<div className={styles.errorWrapper}>
							<h2 className={styles.errorText}>По данному запросу ничего не найдено!</h2>
						</div>)
				}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} setPage={setPage} lastPage={lastPage}/>
			)}
		</div>
	);
};
