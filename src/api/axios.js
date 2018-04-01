import axios from 'axios';
import {browserHistory} from 'react-router';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	res => {
		let {data} = res;

		//0: 正常
		//1：cookie 不正确或失效
		//4: cookie 不正确，请确保内容包含 ewxshinfo 和 ewxinfo
		//10003： 验证码错误
		//10004：邮箱已被注册
		//10005：cookie 已存在
		//10012: 红包链接不正确
		let codes = [0, 1, 4, 10003, 10004, 10005, 10012];

		if (codes.includes(data.code)) {
			return data;
		} else if (data.code == 10000) {
			localStorage.clear();
			browserHistory.push('/login/');
		} else {
			alert(data.message);
			return new Promise(() => {});
		}
	},
	err => Promise.reject(err)
);

export default axios;
