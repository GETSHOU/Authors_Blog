export const getCurrentDate = () => {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	const hours = String(date.getHours()).padStart(2, '0');
	const mins = String(date.getMinutes()).padStart(2, '0');
	const secs = String(date.getSeconds()).padStart(2, '0');

	const timezoneOffset = -date.getTimezoneOffset() / 60;
	const timezone = String(timezoneOffset).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${mins}:${secs}+${timezone}:00`;
};
