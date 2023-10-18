import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '../../store/selectors';
import { checkAccess } from '../../../js/utils';
import { ERROR, PROP_TYPE } from '../../../js/constants';
import { Error } from '../Error/Error';


export const PrivateContent = ({ children, access, serverError = null}) => {
	const userRole = useSelector(userRoleSelector);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error}/> : children;
}

PrivateContent.propTypes = {
	children: PROP_TYPE.CHILDREN,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
};
