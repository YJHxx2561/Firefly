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
				url: "/assets/music/001-使一颗心免于哀伤-知更鸟.mp3",
				cover: "/assets/music/cover/001-使一颗心免于哀伤-知更鸟.webp",
			},
			{
				name: "在银河中孤独摇摆",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/002-在银河中孤独摇摆-知更鸟.mp3",
				cover: "/assets/music/cover/002-在银河中孤独摇摆-知更鸟.webp",
			},
			{
				name: "希望有羽毛和翅膀",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/003-希望有羽毛和翅膀-知更鸟.mp3",
				cover: "/assets/music/cover/003-希望有羽毛和翅膀-知更鸟.webp",
			},
			{
				name: "如果突然想起我",
				artist: "喵酱油 & 花玲 & 爆裂菊是也",
				url: "/assets/music/004-如果突然想起我-喵酱油.mp3",
				cover: "/assets/music/cover/004-如果突然想起我-喵酱油.jpg",
			},
			{
				name: "昔涟",
				artist: "张韶涵 & HOYO-MiX",
				url: "/assets/music/005-昔涟-张韶涵.mp3",
				cover: "/assets/music/cover/005-昔涟-张韶涵.jpg",
			},
			{
				name: "我不曾忘记",
				artist: "花玲 & 张安琪 & 沐霏",
				url: "/assets/music/006-我不曾忘记-花玲.mp3",
				cover: "/assets/music/cover/006-我不曾忘记-花玲.webp",
			},
			{
				name: "让风告诉你",
				artist: "花玲 & 喵酱油 & 宴宁 & Kinsen",
				url: "/assets/music/007-让风告诉你-花玲.mp3",
				cover: "/assets/music/cover/007-让风告诉你-花玲.jpg",
			},
			{
				name: "唯有追赶风的方向 (Only By Chasing the Wind)",
				artist: "知更鸟 & HOYO-MiX & Chevy",
				url: "/assets/music/008-唯有追赶风的方向-(Only-By-Chasing-the-Wind)-知更鸟.mp3",
				cover: "/assets/music/cover/008-唯有追赶风的方向-(Only-By-Chasing-the-Wind)-知更鸟.jpg",
			},
			{
				name: "玻璃",
				artist: "Gareth.T",
				url: "/assets/music/009-玻璃-Gareth.T.mp3",
				cover: "/assets/music/cover/009-玻璃-Gareth.T.webp",
			},
			{
				name: "Take me hand",
				artist: "DAISHI DANCE & Cécile Corbel",
				url: "/assets/music/010-Take-me-hand-DAISHI-DANCE.mp3",
				cover: "/assets/music/cover/010-Take-me-hand-DAISHI-DANCE.jpg",
			},
			{
				name: "九张机",
				artist: "叶炫清",
				url: "/assets/music/011-九张机-叶炫清.mp3",
				cover: "/assets/music/cover/011-九张机-叶炫清.jpg",
			},
			{
				name: "失控",
				artist: "井迪儿",
				url: "/assets/music/012-失控-井迪儿.mp3",
				cover: "/assets/music/cover/012-失控-井迪儿.webp",
			},
			{
				name: "想你时风起",
				artist: "单依纯",
				url: "/assets/music/013-想你时风起-单依纯.mp3",
				cover: "/assets/music/cover/013-想你时风起-单依纯.webp",
			},
			{
				name: "叹云兮",
				artist: "鞠婧祎",
				url: "/assets/music/014-叹云兮-鞠婧祎.mp3",
				cover: "/assets/music/cover/014-叹云兮-鞠婧祎.jpg",
			},
			{
				name: "知我",
				artist: "国风堂, 哦漏",
				url: "/assets/music/015-知我-国风堂,-哦漏.mp3",
				cover: "/assets/music/cover/015-知我-国风堂,-哦漏.jpg",
			},
			{
				name: "我不难过",
				artist: "孙燕姿",
				url: "/assets/music/016-我不难过-孙燕姿.mp3",
				cover: "/assets/music/cover/016-我不难过-孙燕姿.jpg",
			},
			{
				name: "心似烟火",
				artist: "陈壹千",
				url: "/assets/music/017-心似烟火-陈壹千.mp3",
				cover: "/assets/music/cover/017-心似烟火-陈壹千.jpg",
			},
			{
				name: "吹梦到西洲",
				artist: "恋恋故人难、黄诗扶、妖扬",
				url: "/assets/music/018-吹梦到西洲-恋恋故人难、黄诗扶、妖扬.mp3",
				cover: "/assets/music/cover/018-吹梦到西洲-恋恋故人难、黄诗扶、妖扬.webp",
			},
			{
				name: "雨爱",
				artist: "杨丞琳",
				url: "/assets/music/019-雨爱-杨丞琳.mp3",
				cover: "/assets/music/cover/019-雨爱-杨丞琳.webp",
			},
			{
				name: "离开我的依赖",
				artist: "王艳薇",
				url: "/assets/music/020-离开我的依赖-王艳薇.mp3",
				cover: "/assets/music/cover/020-离开我的依赖-王艳薇.jpg",
			},
			{
				name: "此生不换",
				artist: "青鸟飞鱼",
				url: "/assets/music/021-此生不换-青鸟飞鱼.mp3",
				cover: "/assets/music/cover/021-此生不换-青鸟飞鱼.webp",
			},
			{
				name: "踮起脚尖爱 (Live)",
				artist: "单依纯",
				url: "/assets/music/022-踮起脚尖爱-(Live)-单依纯.mp3",
				cover: "/assets/music/cover/022-踮起脚尖爱-(Live)-单依纯.jpg",
			},
			{
				name: "春娇与志明",
				artist: "街道办GDC & 欧阳耀莹",
				url: "/assets/music/023-春娇与志明-街道办GDC.mp3",
				cover: "/assets/music/cover/023-春娇与志明-街道办GDC.jpg",
			},
			{
				name: "小宇",
				artist: "蓝心羽",
				url: "/assets/music/024-小宇-蓝心羽.mp3",
				cover: "/assets/music/cover/024-小宇-蓝心羽.jpg",
			},
			{
				name: "关键词",
				artist: "林俊杰",
				url: "/assets/music/025-关键词-林俊杰.mp3",
				cover: "/assets/music/cover/025-关键词-林俊杰.jpg",
			},
			{
				name: "唯一",
				artist: "G.E.M.邓紫棋",
				url: "/assets/music/026-唯一-G.E.M.邓紫棋.mp3",
				cover: "/assets/music/cover/026-唯一-G.E.M.邓紫棋.jpg",
			},
			{
				name: "空心 (Live)",
				artist: "黄霄雲 & 刘端端",
				url: "/assets/music/027-空心-(Live)-黄霄雲.mp3",
				cover: "/assets/music/cover/027-空心-(Live)-黄霄雲.jpg",
			},
			{
				name: "晴天",
				artist: "周杰伦",
				url: "/assets/music/028-晴天-周杰伦.mp3",
				cover: "/assets/music/cover/028-晴天-周杰伦.jpg",
			},
			{
				name: "回到你身边 (让你知道)",
				artist: "h3R3刘清云",
				url: "/assets/music/029-回到你身边-(让你知道)-h3R3刘清云.mp3",
				cover: "/assets/music/cover/029-回到你身边-(让你知道)-h3R3刘清云.jpg",
			},
			{
				name: "NIGHT DANCER",
				artist: "imase",
				url: "/assets/music/030-NIGHT-DANCER-imase.mp3",
				cover: "/assets/music/cover/030-NIGHT-DANCER-imase.jpg",
			},
			{
				name: "迷人的危险",
				artist: "姚晓棠",
				url: "/assets/music/031-迷人的危险-姚晓棠.mp3",
				cover: "/assets/music/cover/031-迷人的危险-姚晓棠.jpg",
			},
			{
				name: "Deadman",
				artist: "蔡徐坤",
				url: "/assets/music/032-Deadman-蔡徐坤.mp3",
				cover: "/assets/music/cover/032-Deadman-蔡徐坤.jpg",
			},
			{
				name: "寂寞烟火",
				artist: "蓝心羽",
				url: "/assets/music/033-寂寞烟火-蓝心羽.mp3",
				cover: "/assets/music/cover/033-寂寞烟火-蓝心羽.jpg",
			},
			{
				name: "恋爱画板",
				artist: "锦零",
				url: "/assets/music/034-恋爱画板-锦零.mp3",
				cover: "/assets/music/cover/034-恋爱画板-锦零.jpg",
			},
			{
				name: "雨天",
				artist: "孙燕姿",
				url: "/assets/music/035-雨天-孙燕姿.mp3",
				cover: "/assets/music/cover/035-雨天-孙燕姿.jpg",
			},
			{
				name: "戒烟",
				artist: "李荣浩",
				url: "/assets/music/036-戒烟-李荣浩.mp3",
				cover: "/assets/music/cover/036-戒烟-李荣浩.jpg",
			},
			{
				name: "多远都要在一起",
				artist: "G.E.M.邓紫棋",
				url: "/assets/music/037-多远都要在一起-G.E.M.邓紫棋.mp3",
				cover: "/assets/music/cover/037-多远都要在一起-G.E.M.邓紫棋.jpg",
			},
			{
				name: "甲乙丙丁 (粤语版)",
				artist: "李佳薇",
				url: "/assets/music/038-甲乙丙丁-(粤语版)-李佳薇.mp3",
				cover: "/assets/music/cover/038-甲乙丙丁-(粤语版)-李佳薇.jpg",
			},
			{
				name: "可惜没如果",
				artist: "林俊杰",
				url: "/assets/music/039-可惜没如果-林俊杰.mp3",
				cover: "/assets/music/cover/039-可惜没如果-林俊杰.jpg",
			},
			{
				name: "如果爱忘了",
				artist: "戚薇",
				url: "/assets/music/040-如果爱忘了-戚薇.mp3",
				cover: "/assets/music/cover/040-如果爱忘了-戚薇.jpg",
			},
			{
				name: "后来的我们",
				artist: "五月天",
				url: "/assets/music/041-后来的我们-五月天.mp3",
				cover: "/assets/music/cover/041-后来的我们-五月天.jpg",
			},
			{
				name: "私奔",
				artist: "郑钧",
				url: "/assets/music/042-私奔-郑钧.mp3",
				cover: "/assets/music/cover/042-私奔-郑钧.jpg",
			},
			{
				name: "空山新雨后",
				artist: "音阙诗听 & 锦零",
				url: "/assets/music/043-空山新雨后-音阙诗听.mp3",
				cover: "/assets/music/cover/043-空山新雨后-音阙诗听.jpg",
			},
			{
				name: "舍得",
				artist: "王唯旖",
				url: "/assets/music/044-舍得-王唯旖.mp3",
				cover: "/assets/music/cover/044-舍得-王唯旖.jpg",
			},
			{
				name: "雨过后的风景",
				artist: "Dizzy Dizzo (蔡诗芸)",
				url: "/assets/music/045-雨过后的风景-Dizzy-Dizzo-(蔡诗芸).mp3",
				cover: "/assets/music/cover/045-雨过后的风景-Dizzy-Dizzo-(蔡诗芸).jpg",
			},
			{
				name: "慢慢",
				artist: "小乐哥（王唯乐）",
				url: "/assets/music/046-慢慢-小乐哥（王唯乐）.mp3",
				cover: "/assets/music/cover/046-慢慢-小乐哥（王唯乐）.jpg",
			},
			{
				name: "指纹",
				artist: "杜宣达",
				url: "/assets/music/047-指纹-杜宣达.mp3",
				cover: "/assets/music/cover/047-指纹-杜宣达.jpg",
			},
			{
				name: "愿与愁",
				artist: "林俊杰",
				url: "/assets/music/048-愿与愁-林俊杰.mp3",
				cover: "/assets/music/cover/048-愿与愁-林俊杰.jpg",
			},
			{
				name: "Letting Go",
				artist: "蔡健雅",
				url: "/assets/music/049-Letting-Go-蔡健雅.mp3",
				cover: "/assets/music/cover/049-Letting-Go-蔡健雅.jpg",
			},
			{
				name: "Blueming",
				artist: "IU (아이유)",
				url: "/assets/music/050-Blueming-IU-(아이유).mp3",
				cover: "/assets/music/cover/050-Blueming-IU-(아이유).jpg",
			},
			{
				name: "凑热闹",
				artist: "BY2",
				url: "/assets/music/051-凑热闹-BY2.mp3",
				cover: "/assets/music/cover/051-凑热闹-BY2.jpg",
			},
			{
				name: "嚣张",
				artist: "en (王翊恩)",
				url: "/assets/music/052-嚣张-en-(王翊恩).mp3",
				cover: "/assets/music/cover/052-嚣张-en-(王翊恩).jpg",
			},
			{
				name: "遇见",
				artist: "孙燕姿",
				url: "/assets/music/053-遇见-孙燕姿.mp3",
				cover: "/assets/music/cover/053-遇见-孙燕姿.jpg",
			},
			{
				name: "一程山路",
				artist: "毛不易",
				url: "/assets/music/054-一程山路-毛不易.mp3",
				cover: "/assets/music/cover/054-一程山路-毛不易.jpg",
			},
			{
				name: "群青",
				artist: "YOASOBI (ヨアソビ)",
				url: "/assets/music/055-群青-YOASOBI-(ヨアソビ).mp3",
				cover: "/assets/music/cover/055-群青-YOASOBI-(ヨアソビ).jpg",
			},
			{
				name: "富士山下",
				artist: "陈奕迅",
				url: "/assets/music/056-富士山下-陈奕迅.mp3",
				cover: "/assets/music/cover/056-富士山下-陈奕迅.jpg",
			},
			{
				name: "Always Online",
				artist: "林俊杰",
				url: "/assets/music/057-Always-Online-林俊杰.mp3",
				cover: "/assets/music/cover/057-Always-Online-林俊杰.jpg",
			},
			{
				name: "盛夏的果实",
				artist: "莫文蔚",
				url: "/assets/music/058-盛夏的果实-莫文蔚.mp3",
				cover: "/assets/music/cover/058-盛夏的果实-莫文蔚.jpg",
			},
			{
				name: "海阔天空",
				artist: "BEYOND",
				url: "/assets/music/059-海阔天空-BEYOND.mp3",
				cover: "/assets/music/cover/059-海阔天空-BEYOND.jpg",
			},
			{
				name: "嘉宾",
				artist: "张远",
				url: "/assets/music/060-嘉宾-张远.mp3",
				cover: "/assets/music/cover/060-嘉宾-张远.jpg",
			},
			{
				name: "把回忆拼好给你",
				artist: "苏星婕",
				url: "/assets/music/061-把回忆拼好给你-苏星婕.mp3",
				cover: "/assets/music/cover/061-把回忆拼好给你-苏星婕.jpg",
			},
			{
				name: "海屿你 (Single Version)",
				artist: "马也_Crabbit & Big Cole",
				url: "/assets/music/062-海屿你-(Single-Version)-马也_Crabbit.mp3",
				cover: "/assets/music/cover/062-海屿你-(Single-Version)-马也_Crabbit.jpg",
			},
		],
	},
};
