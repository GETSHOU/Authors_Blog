import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetForm } from '../../hooks';
import { server } from '../../../js/bff';
import { ROLES } from '../../../js/constants';
import { setUserAction } from '../../store/actions';
import { userRoleSelector } from '../../store/selectors';
import { checkAccess } from '../../../js/utils';
import { FormField, FormButton, ErrorForm } from '../../components/Form/components';
import styles from './Authorization.module.css';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(/^\w+$/, 'Некорректный логин. Допускаются только буквы и цифры')
		.min(3, 'Некорректный логин. Должно быть минимум 3 символа')
		.max(15, 'Некорректный логин. Должно быть максимум 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(/^[\w#%]+$/, 'Некорректный пароль. Допускаются только буквы, цифры и знаки: #, %'
		)
		.min(6, 'Некорректный пароль. Должно быть минимум 6 символа')
		.max(20, 'Некорректный пароль. Должно быть максимум 20 символов'),
});

export const Authorization = ({title}) => {
	const [serverError, setServerError] = useState(null);
	const [showError, setShowError] = useState(false);

	const dispatch = useDispatch();
	const userRole = useSelector(userRoleSelector);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.authorization(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setShowError(true);
				return;
			}

			dispatch(setUserAction(response));
			sessionStorage.setItem('userData', JSON.stringify(response));
		});
	};

	const loginErrorMessage = errors?.login?.message;
	const passwordErrorMessage = errors?.password?.message;
	const isGuest = checkAccess([ROLES.GUEST], userRole);

	if(!isGuest) {
		return <Navigate to='/' />;
	}

	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
			</header>
			<main className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.fieldsWrapper}>
						<FormField type='text' placeholder='логин' labelname='Логин' autoComplete='username' error={loginErrorMessage} {...register('login', {
							onChange: () => {
								setServerError(null);
								setShowError(false);
							},
						})}/>
						<FormField type='password' placeholder='пароль' labelname='Пароль' autoComplete='current-password' error={passwordErrorMessage} {...register('password')}/>
					</div>
					<div className={styles.buttonsWrapper}>
						<FormButton type='submit' text='Войти' disabled={!!loginErrorMessage || !!passwordErrorMessage || !!serverError}/>
					</div>
					{showError && <ErrorForm serverError={serverError} />}
				</form>
			</main>
			<footer className={styles.footer}>
				<span className={styles.text}>Не зарегистрированы?
					<Link to='/registration' className={styles.link}>Создать аккаунт</Link>
				</span>
			</footer>
		</div>
	)
};

Authorization.propTypes = {
	title: PropTypes.string.isRequired,
};
