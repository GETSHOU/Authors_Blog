import { useEffect, useState, useMemo } from 'react';
import { useServerRequest } from '../../hooks';
import { PostItem } from './components';
import { Pagination, SearchField } from './components';
import { PAGINATION } from '../../../js/constants';
import { getLastPageFromLinks, debounce } from '../Main/utils';
import styles from './Posts.module.css';

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION.limitOfElementsPerPage, searchQuery)
			.then(({ response: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			});
	}, [requestServer, page, shouldSearch]);

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
							{posts.map(({id, title, imageUrl, publishedAt, commentsCount}, i) => (
								<PostItem
									key={i}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
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
