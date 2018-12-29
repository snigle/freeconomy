import moment from "moment";
import * as React from "react";

interface IProps {
  callback: (date: Date) => void;
  value: Date;
}

// tslint:disable-next-line:space-before-function-paren
export default function (props: IProps): JSX.Element {
  return <input
    type="date"
    onChange={(event) => {
      const parsedDate = moment(event.target.value);
      props.callback(parsedDate.toDate());
    }}
    placeholder="Choose a date"
    value={props.value.toISOString().split("T")[0]} />;
}
