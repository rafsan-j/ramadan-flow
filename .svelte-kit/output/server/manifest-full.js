export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["manifest.json","sw.js"]),
	mimeTypes: {".json":"application/json",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.BbM5OOlA.js",app:"_app/immutable/entry/app.BGLtm9zU.js",imports:["_app/immutable/entry/start.BbM5OOlA.js","_app/immutable/chunks/C9qSf0Ue.js","_app/immutable/chunks/DePUFE4i.js","_app/immutable/chunks/Cq2FQNBD.js","_app/immutable/entry/app.BGLtm9zU.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DePUFE4i.js","_app/immutable/chunks/Wx7R11z-.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/heatmap",
				pattern: /^\/heatmap\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/library",
				pattern: /^\/library\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/sadaqah",
				pattern: /^\/sadaqah\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
