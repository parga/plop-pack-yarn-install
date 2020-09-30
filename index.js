const { spawn } = require('child_process');

const didSucceed = (code) => `${code}` === '0';

function yarnInstall(_, config) {
	const spawnOptions = config.verbose ? {
		cwd: config.path,
		shell: true,
		stdio: 'inherit',
	} : {
		cwd: config.path
	};

	return new Promise((resolve, reject) => {
		const npmI = spawn('yarn', ['install'], spawnOptions);

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
