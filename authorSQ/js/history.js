const febHolidays = [
	"第24届北京冬奥会",
	"东航MU5735航班坠机事故",
	"互联网内容平台公开账号IP属地",
	"神州十三号载人飞船返回地球",
	"神州十四号载人飞船成功发射",
	"教材插图争议",
	"唐山烧烤店打人事件",
	"南方大旱与重庆大火",
	"南京玄奘寺供奉侵华日军战犯牌位",
	"芦山地震",
	"泸定地震",
	"二十大顺利召开",
	"大疫三年如今放开",
	"俄乌冲突爆发",
	"猴痘爆发",
	"不明原因儿童急性肝炎",
	"斯里兰卡破产",
	"安倍晋三遇刺身亡",
	"戈尔巴乔夫去世",
	"英国首相接连换人",
	"英国女王伊丽莎白二世去世",
	"韩国首尔梨泰院踩踏事故",
	"2022卡塔尔世界杯",
];


const ulEl = document.querySelector("ul");
const d = new Date();
let daynumber = d.getMonth() == 1 ? d.getDate() - 1 : 0;
let activeIndex = daynumber;
const rotate = -360 / febHolidays.length;
init();

function init() {
	febHolidays.forEach((holiday, idx) => {
		const liEl = document.createElement("li");
		liEl.style.setProperty("--day_idx", idx);
		liEl.innerHTML = `<time datetime="2022-02-${idx + 1}">${
			idx + 1
		}</time><span>${holiday}</span>`;
		ulEl.append(liEl);
	});
	ulEl.style.setProperty("--rotateDegrees", rotate);
	adjustDay(0);
}

function adjustDay(nr) {
	daynumber += nr;
	ulEl.style.setProperty("--currentDay", daynumber);

	const activeEl = document.querySelector("li.active");
	if (activeEl) activeEl.classList.remove("active");

	activeIndex = (activeIndex + nr + febHolidays.length) % febHolidays.length;
	const newActiveEl = document.querySelector(`li:nth-child(${activeIndex + 1})`);
	document.body.style.backgroundColor = window.getComputedStyle(
		newActiveEl
	).backgroundColor;

	newActiveEl.classList.add("active");
}

window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowUp":
			adjustDay(-1);
			break;
		case "ArrowDown":
			adjustDay(1);
			break;
		default:
			return;
	}
});

// 狮子头
"use strict";
const MenuOption = (props) => {
	const { toggled } = React.useContext(AppContext);
	const className = `menu-${props.type}-option`, delay = toggled ? 200 : 0;
	const styles = {
		transitionDelay: `${delay + (50 * props.index)}ms`
	};
	return (React.createElement("a", { href: props.url, target: "_blank", className: className, disabled: !toggled, style: styles },
		React.createElement("i", { className: props.icon }),
		React.createElement("h3", { className: props.type === "quick" ? "tooltip" : "label" }, props.label)));
};
const Menu = () => {
	const { toggled } = React.useContext(AppContext);
	const profileImage = "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
	const getOptions = (options, type) => {
		return options.map((option, index) => (React.createElement(MenuOption, { key: option.label, icon: option.icon, index: index, label: option.label, url: option.url, type: type })));
	};
	const getQuickOptions = () => {
		return getOptions([{
			icon: "fa-solid fa-house", label: "过年啦(首页)", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/index.html"
		}, {
			icon: "fa-solid fa-gear", label: "有故障求告诉", url: "mailto:916286233@qq.com"
		}, {
			icon: "fa-solid fa-moon", label: "深夜の游戏", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/StickHero.html"
		}], "quick");
	};
	const getFullOptions = () => {
		return getOptions([{
			icon: "fa-solid fa-chart-line", label: "日历", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/calendar.html"
		}, {
			icon: "fa-solid fa-bell", label: "年度事件", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/history.html"
		}, {
			icon: "fa-solid fa-heart", label: "今日头条", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/todaysNews.html"
		}, {
			icon: "fa-solid fa-wallet", label: "看板总结", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/board.html"
		}, {
			icon: "fa-solid fa-user", label: "我的资料", url: "http://localhost:63342/0117_sq3(final)/0117_sq1/authorSQ/resume.html"
		}], "full");
	};
	return (React.createElement("div", { id: "menu", className: classNames({ toggled }) },
		React.createElement("div", { id: "menu-background-wrapper" },
			React.createElement("div", { id: "menu-background" })),
		React.createElement("img", { id: "menu-profile-image", src: profileImage }),
		React.createElement("div", { id: "menu-quick-options" }, getQuickOptions()),
		React.createElement("div", { id: "menu-full-options" }, getFullOptions())));
};
const AppContext = React.createContext(null);
const App = () => {
	const [toggled, setToggledTo] = React.useState(false);
	React.useEffect(() => {
		setTimeout(() => setToggledTo(true), 1000);
	}, []);
	const handleOnClick = () => setToggledTo(!toggled);
	return (React.createElement(AppContext.Provider, { value: { toggled } },
		React.createElement("div", { id: "app" },
			React.createElement(Menu, null),
			React.createElement("button", { id: "menu-toggle", type: "button", onClick: handleOnClick },
				React.createElement("i", { className: toggled ? "fa-solid fa-xmark-large" : "fa-solid fa-bars-staggered" })))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));