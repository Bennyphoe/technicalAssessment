import { FC } from "react";
import * as styles from './styles.scss';

export type OverlayProps = {
  acreName: string;
  acreDistance: number
}

const Overlay: FC<OverlayProps> = ({acreName, acreDistance}) => {
  console.log(acreName)
  return (
    <div className={styles.container}>
      {acreName}<br/>
      the reported acres is {acreDistance}. Half of that is {acreDistance / 2}
    </div>
  )
}

export default Overlay