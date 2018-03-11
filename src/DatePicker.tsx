import * as React from "react"
import {TextInput, DatePickerAndroid} from "react-native"

type callback = (date : Date) => any

interface Props {
  callback : (date : Date) => void,
  value : Date,
}

const formatDate = (date : Date) => `${date.getFullYear()}-${(date.getMonth()+1)%12}-${date.getDate()}`

async function selectDate(defaultDate: Date, f : (date: Date)=>void) : Promise<void>{
  return DatePickerAndroid.open({date: defaultDate}).then(({action, year, month, day}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      return f(new Date(year || defaultDate.getFullYear(),month || defaultDate.getMonth(),day || defaultDate.getDay()))
    }
  }).catch(({code, message})=>
    console.warn('Cannot open date picker', message)
  );
}

export default function (props:Props) : JSX.Element {
  return <TextInput onTouchStart={() => selectDate(props.value, props.callback)} value={formatDate(props.value)}/>
}
