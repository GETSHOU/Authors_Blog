import PropTypes from 'prop-types';
import { ROLES } from './roles';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLES));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	CHILDREN: PropTypes.node.isRequired,
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	COMMENT: PropTypes.shape({
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	USER: PropTypes.shape({
		id: PropTypes.string.isRequired,
		login: PropTypes.string.isRequired,
		roleId: PropTypes.number.isRequired,
		registeredAt: PropTypes.string.isRequired,
	}),
};
