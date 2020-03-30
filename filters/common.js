// 通用过滤器
import CommonUtils from '@/common/common'

export default {
	/* null、undefined转空字符串 */
	empty: value => {
		return CommonUtils.isEmpty(value) ? '' : value
	},
	//秒转成分秒
	secsToMinSecs: value => {
		let m, s = ''
		m = Math.floor(Number(value) / 60) > 9 ? Math.floor(Number(value) / 60) : '0' + Math.floor(Number(value) / 60)
		s = Math.ceil(Number(value) % 60) > 9 ? Math.ceil(Number(value) % 60) : '0' + Math.ceil(Number(value) % 60)
		if (s == '60') {
			s = '00'
			m = '01'
		}
		return m + ':' + s
	}
}
