function showError(message) {
	var snackbarContainer = document.querySelector('.mdl-js-snackbar');
	var data = {
		message : message,
	};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}