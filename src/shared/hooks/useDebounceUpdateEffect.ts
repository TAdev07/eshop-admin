// chạy debounce effect khi thay đổi thuộc tính trừ lần load đầu tiên
import { useDebounceFn as useDebounceFn_1 } from 'ahooks';
import { useUpdateEffect as useUpdateEffect_1 } from 'ahooks';
import { useUnmount as useUnmount_1 } from 'ahooks';
// eslint-disable-next-line no-mixed-operators
var __read = this && this.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = {
            error: error
        };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }

    return ar;
};
var react_1 = require("react");
function useDebounceUpdateEffect(effect, deps, options) {
    var _a = __read(react_1.useState({}), 2),
        flag = _a[0],
        setFlag = _a[1];

    var _b = useDebounceFn_1(function () {
        setFlag({});
    }, options),
        run = _b.run,
        cancel = _b.cancel;
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            return run();
        }
    }, deps);
    useUnmount_1(cancel);
    useUpdateEffect_1(effect, [flag]);
}

export default useDebounceUpdateEffect;