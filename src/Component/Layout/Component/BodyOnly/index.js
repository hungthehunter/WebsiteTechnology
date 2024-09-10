import classNames from "classnames/bind";

import styles from "./BodyOnly.module.scss";
const cx=classNames.bind(styles)
function BodyOnly({ children }) {
  return(
<div className={cx("wrapper")}>

{children}

</div>
  )
}
export default BodyOnly;