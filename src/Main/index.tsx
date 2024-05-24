import * as styles from './styles.scss'
import { useOpenLayers } from './hooks'
import 'ol/ol.css';
import Overlay from './components/Overlay';
import { useState } from 'react';

const Main = () => {
  const {mapRef, overlayRef, selectedAcre, olMap, addPoint, addLine, addPolygon} = useOpenLayers()
  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map}></div>
      <div ref={overlayRef}>
        {selectedAcre && <Overlay acreName={selectedAcre.acreName} acreDistance={selectedAcre.acreDistance}/>}
      </div>
      <div>
        <button onClick={addPoint}>Point</button>
        <button onClick={addLine}>Line</button>
        <button onClick={addPolygon}>polygon</button>
      </div>
    </div>
  )
}

export default Main