import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetForm } from '../../hooks';
import { ROLES } from '../../../constants';
import { setUserAction } from '../../store/actions';
import { userRoleSelector } from '../../store/selectors';
import { checkAccess, request } from '../../../utils';
import { FormField, FormButton, ErrorForm } from '../../components/Form/components';
import styles from './Registration.module.css';

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const Registration = ({title}) => {
	const [serverError, setServerError] = useState(null);
	const [showError, setShowError] = useState(false);

	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', {login, password}).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setShowError(true);
				return;
			}

			dispatch(setUserAction(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const loginErrorMessage = errors?.login?.message;
	const passwordErrorMessage = errors?.password?.message;
	const passcheckErrorMessage = errors?.passcheck?.message;
	const isGuest = checkAccess([ROLES.GUEST], roleId);

	if (!isGuest) {
		return <Navigate to='/' />
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
						<FormField type='password' placeholder='проверка пароля' labelname='Проверка пароля' autoComplete='new-password' error={passcheckErrorMessage} {...register('passcheck')}/>
					</div>
					<div className={styles.buttonsWrapper}>
						<FormButton type='submit' text='Зарегистрироваться' disabled={!!loginErrorMessage || !!passwordErrorMessage || !!passcheckErrorMessage || !!serverError}/>
					</div>
					{showError && <ErrorForm serverError={serverError} />}
				</form>
			</main>
		</div>
	)
};

Registration.propTypes = {
	title: PropTypes.string.isRequired,
};
