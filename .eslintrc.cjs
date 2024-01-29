module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint'],
	overrides: [
		{
			files: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).tsx', '**/test-utils/*'],
			env: {
				jest: true,
			},
		},
	],
	rules: {
		'no-restricted-syntax': [0],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-refresh/only-export-components': 'warn',
		'import/prefer-default-export': [0],
		'import/no-extraneous-dependencies': [
			0,
			{
				devDependencies: ['**/?(*.)+(spec|test).tsx', '**/test-setup.ts', '**/test-utils/*', '**/craco.config.js'],
			},
		],
		'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
		'@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
		'no-param-reassign': [2, { props: true, ignorePropertyModificationsFor: ['result'] }],
		'react/function-component-definition': [
			1,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'@typescript-eslint/lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
		'arrow-body-style': [1],
		'class-methods-use-this': [1],
		'react/jsx-no-useless-fragment': [1],
		'react/prop-types': [0],
		'no-template-curly-in-string': [0],
		'react/jsx-props-no-spreading': [0],
		'react/require-default-props': [0],
		'react/jsx-uses-react': [0],
		'react/react-in-jsx-scope': [0],
		'no-plusplus': [0],
		'react/no-unescaped-entities': [0],
	},
}
