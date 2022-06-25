import StatusConstants from '../constants/statusConstants';

const createResponse = (status: number, data: any) => {
	return {
		status: status,
		success: getSuccess(status),
		data: data,
	};
};

const getSuccess = (status: number) => {
	return (
		status >= StatusConstants.SUCCESS_STATUS &&
		status < StatusConstants.ERROR_STATUS
	);
};

module.exports = { createResponse };
