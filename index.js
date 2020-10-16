const { spawn } = require('child_process');

const didSucceed = (code) => `${code}` === '0';

function yarnInstall(_, {verbose, path, params}) {

	const spawnOptions = verbose ? {
		cwd: path,
		shell: true,
		stdio: 'inherit',
	} : {
		cwd: path
	};

	return new Promise((resolve, reject) => {
		console.log('executing', ['yarn', ...params].join(' '), 'with options : ', spawnOptions);
		const yarnI = spawn('yarn', [...params], spawnOptions);

		yarnI.on('close', (code) => {
			if (didSucceed(code)) {
				resolve(`yarn install ran correctly`);
			} else {
				reject(`yarn install exited with ${code}`);
			}
		});
	});
}

module.exports = function (plop) {
	plop.setDefaultInclude({ actionTypes: true });
	plop.setActionType('yarnInstall', yarnInstall);
};
