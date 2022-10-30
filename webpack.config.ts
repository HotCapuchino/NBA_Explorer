/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'path';
import { Configuration as WebpackConfiguration, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env?.MODE ? (process.env.MODE as 'development' | 'production') : 'development';
const appTitle = process.env?.APP_TITLE || 'Test';
const styleLoader = mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
	mode,
	devtool: 'source-map',
	target: 'web',
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', 'less', '.svg'],
		alias: {
			'react-dom': mode === 'development' ? '@hot-loader/react-dom' : 'react-dom',
			src: path.resolve(__dirname, 'src'),
		},
		modules: ['node_modules'],
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.(ts|js)x?$/i,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								configFile: path.resolve(__dirname, '.babelrc'),
							},
						},
					},
					{
						test: /\.svg$/,
						// use: [
						// 	'url-loader',
						// 	'babel-loader',
						// 	{
						// 		loader: '@svgr/webpack',
						// 		options: {
						// 			configFile: path.resolve(__dirname, 'appconfig', 'svgr', 'config.js'),
						// 		},
						// 	},
						// ],
						use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
					},
					{
						test: /\.svg$/,
						exclude: /\.(j|t)sx?$/,
						use: ['url-loader', 'svgo-loader'],
					},
					{
						test: /\.s(a|c)ss$/,
						use: [
							styleLoader,
							'css-loader',
							'postcss-loader',
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'style-resources-loader',
								options: {
									patterns: [path.resolve(__dirname, 'src/styles/palette.scss')],
								},
							},
						],
					},
					{
						test: /\.(png|gif|jpg)$/,
						exclude: /fonts/,
						use: ['file-loader'],
					},
					{
						test: /\.(woff2?|eot|ttf)$/,
						use: ['url-loader'],
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.ejs'),
			title: appTitle,
			inject: 'body',
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			eslint: {
				files: './**/*.{ts,tsx,js,jsx}',
				options: {
					fix: false,
				},
				memoryLimit: 4096,
			},
			typescript: {
				configFile: path.resolve(__dirname, 'tsconfig.json'),
			},
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			emitError: true,
			emitWarning: false,
			failOnWarning: false,
			ignorePath: path.resolve(__dirname, '.eslintignore'),
		}),
		new ProgressPlugin(),
	],
	devServer: {
		static: path.join(__dirname, 'build'),
		historyApiFallback: true,
		port: 3000,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		hot: true,
	},
	watch: true,
	stats: {
		children: true,
	},
};

export default config;
