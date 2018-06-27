import * as React from "react";

interface IProps {
  callback: (date: Date) => void;
  value: Date;
}

export default function(props: IProps): JSX.Element {
  return <input
    type="date"
    onChange={(event) => props.callback(new Date(event.target.value))}
    placeholder="Choose a date"
    value={props.value.toISOString().split("T")[0]}/>;
}
