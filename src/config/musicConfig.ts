import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: false,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "10046455237",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			{
				name: "使一颗心免于哀伤",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/01-shiyikexinmianyuaishang-zhigengniao-hoyo-mix-chevy.mp3",
				cover: "/assets/music/cover/01-shiyikexinmianyuaishang-zhigengniao-hoyo-mix-chevy.webp",
			},
			{
				name: "在银河中孤独摇摆",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/02-zaiyinhezhongguduyaobai-zhigengniao-hoyo-mix-chevy.mp3",
				cover: "/assets/music/cover/02-zaiyinhezhongguduyaobai-zhigengniao-hoyo-mix-chevy.webp",
			},
			{
				name: "希望有羽毛和翅膀",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/03-xiwangyouyumaohechibang-zhigengniao-hoyo-mix-chevy.mp3",
				cover: "/assets/music/cover/03-xiwangyouyumaohechibang-zhigengniao-hoyo-mix-chevy.webp",
			},
			{
				name: "玻璃",
				artist: "Gareth.T",
				url: "/assets/music/04-boli-gareth-t.mp3",
				cover: "/assets/music/cover/04-boli-gareth-t.webp",
			},
			{
				name: "Take me hand",
				artist: "DAISHI DANCE & Cécile Corbel",
				url: "/assets/music/05-take-me-hand-daishi-dance-and-cecile-corbel.mp3",
				cover: "/assets/music/cover/05-take-me-hand-daishi-dance-and-cecile-corbel.jpg",
			},
			{
				name: "九张机",
				artist: "叶炫清",
				url: "/assets/music/06-jiuzhangji-yexuanqing.mp3",
				cover: "/assets/music/cover/06-jiuzhangji-yexuanqing.jpg",
			},
			{
				name: "失控",
				artist: "井迪儿",
				url: "/assets/music/07-shikong-jingdier.mp3",
				cover: "/assets/music/cover/07-shikong-jingdier.webp",
			},
			{
				name: "想你时风起",
				artist: "单依纯",
				url: "/assets/music/08-xiangnishifengqi-danyichun.mp3",
				cover: "/assets/music/cover/08-xiangnishifengqi-danyichun.webp",
			},
			{
				name: "叹云兮",
				artist: "鞠婧祎",
				url: "/assets/music/09-tanyunxi-jujingyi.mp3",
				cover: "/assets/music/cover/09-tanyunxi-jujingyi.jpg",
			},
			{
				name: "知我",
				artist: "国风堂, 哦漏",
				url: "/assets/music/10-zhiwo-guofengtang-olou.mp3",
				cover: "/assets/music/cover/10-zhiwo-guofengtang-olou.jpg",
			},
			{
				name: "如果突然想起我",
				artist: "喵酱油 & 花玲 & 爆裂菊是也",
				url: "/assets/music/11-ruguoturanxiangqiwo-miaojiangyou-and-hualing-and-baoliejushiye.mp3",
				cover: "/assets/music/cover/11-ruguoturanxiangqiwo-miaojiangyou-and-hualing-and-baoliejushiye.jpg",
			},
			{
				name: "我不难过",
				artist: "孙燕姿",
				url: "/assets/music/12-wobunanguo-sunyanzi.mp3",
				cover: "/assets/music/cover/12-wobunanguo-sunyanzi.jpg",
			},
			{
				name: "心似烟火",
				artist: "陈壹千",
				url: "/assets/music/13-xinsiyanhuo-chenyiqian.mp3",
				cover: "/assets/music/cover/13-xinsiyanhuo-chenyiqian.jpg",
			},
			{
				name: "吹梦到西洲",
				artist: "恋恋故人难、黄诗扶、妖扬",
				url: "/assets/music/14-chuimengdaoxizhou-lianliangurennan-huangshifu-yaoyang.mp3",
				cover: "/assets/music/cover/14-chuimengdaoxizhou-lianliangurennan-huangshifu-yaoyang.webp",
			},
			{
				name: "昔涟",
				artist: "张韶涵 & HOYO-MiX",
				url: "/assets/music/15-xilian-zhangshaohan-and-hoyo-mix.mp3",
				cover: "/assets/music/cover/15-xilian-zhangshaohan-and-hoyo-mix.jpg",
			},
			{
				name: "雨爱",
				artist: "杨丞琳",
				url: "/assets/music/16-yuai-yangchenglin.mp3",
				cover: "/assets/music/cover/16-yuai-yangchenglin.webp",
			},
			{
				name: "离开我的依赖",
				artist: "王艳薇",
				url: "/assets/music/17-likaiwodeyilai-wangyanwei.mp3",
				cover: "/assets/music/cover/17-likaiwodeyilai-wangyanwei.jpg",
			},
			{
				name: "我不曾忘记",
				artist: "花玲 & 张安琪 & 沐霏",
				url: "/assets/music/18-wobucengwangji-hualing-and-zhanganqi-and-mufei.mp3",
				cover: "/assets/music/cover/18-wobucengwangji-hualing-and-zhanganqi-and-mufei.webp",
			},
			{
				name: "让风告诉你",
				artist: "花玲 & 喵酱油 & 宴宁 & Kinsen",
				url: "/assets/music/19-rangfenggaosuni-hualing-and-miaojiangyou-and-yanning-and-kinsen.mp3",
				cover: "/assets/music/cover/19-rangfenggaosuni-hualing-and-miaojiangyou-and-yanning-and-kinsen.jpg",
			},
			{
				name: "此生不换",
				artist: "青鸟飞鱼",
				url: "/assets/music/20-cishengbuhuan-qingniaofeiyu.mp3",
				cover: "/assets/music/cover/20-cishengbuhuan-qingniaofeiyu.webp",
			},
		],
	},
};
