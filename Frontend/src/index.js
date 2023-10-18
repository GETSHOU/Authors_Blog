import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './react/store/store';
import { Main, Posts, Authorization, Registration, Users, Post } from './react/pages';
import { Error } from './react/components';
import { ERROR } from './js/constants';
import './css/index.css';

// json-server --watch src/data/db.json --port 3005

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Main />}>
					<Route index element={<Posts />} />
					<Route
						path="authorization"
						element={<Authorization title="Авторизация" />}
					/>
					<Route
						path="registration"
						element={<Registration title="Регистрация" />}
					/>
					<Route path="post" element={<Post />}>
						<Route path=":id" element={<Post />} />
						<Route path=":id/edit" element={<Post />} />
					</Route>
					<Route path="users" element={<Users />}></Route>
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Route>
			</Routes>
		</Provider>
	</BrowserRouter>,
);
