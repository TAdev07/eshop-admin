import React from 'react'
import 'antd/es/date-picker/style/index';
import DatePicker from './DatePicker';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';

export interface TimePickerProps extends Omit<PickerTimeProps<Date>, 'picker'> { }

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
    return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});
export default TimePicker;